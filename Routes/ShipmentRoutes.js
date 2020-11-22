import express from "express";
import shipmentController from "../Controller/ShipmentsController/Shipments";
import distance from "google-distance-matrix";
const router = express.Router();
const ShipmentController = new shipmentController();

router.post("/api/request-shipment", (request, response) => {
  ShipmentController.RequestShipment(request, response);
});

router.post("/api/track-shipment", (request, response) => {
  ShipmentController.ShipmentLookUp(request, response);
});

router.get("/api/all-pending-shipments", (request, response) => {
  ShipmentController.GetAllPending(request, response);
});

router.get("/api/all-delivered-shipments", (request, response) => {
  ShipmentController.GetAllDelivered(request, response);
});

router.post("/api/update-status/:id", (request, response) => {
  ShipmentController.UpdateStatus(request, response);
});

router.get("/api/distance", (req, res) => {
  var origins = ["San Francisco CA", "40.7421,-73.9914"];
  var destinations = [
    "New York NY",
    "Montreal",
    "41.8337329,-87.7321554",
    "Honolulu",
  ];

  distance.key("AIzaSyCXoDd6wbl4gGbcgk286sUo2Knx2g1FpLk");
  distance.units("imperial");

  distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
      return console.log(err);
    }
    if (!distances) {
      return console.log("no distances");
    }
    if (distances.status == "OK") {
      for (var i = 0; i < origins.length; i++) {
        for (var j = 0; j < destinations.length; j++) {
          var origin = distances.origin_addresses[i];
          var destination = distances.destination_addresses[j];
          if (distances.rows[0].elements[j].status == "OK") {
            var distance = distances.rows[i].elements[j].distance.text;
            console.log(
              "Distance from " +
                origin +
                " to " +
                destination +
                " is " +
                distance
            );
          } else {
            console.log(
              destination + " is not reachable by land from " + origin
            );
          }
        }
      }
    }
  });
});

export default router;
