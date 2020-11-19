import express from "express";
import shipmentController from "../Controller/ShipmentsController/Shipments";

const router = express.Router();
const ShipmentController = new shipmentController();

router.post("/api/request-shipment", (request, response) => {
  ShipmentController.RequestShipment(request, response);
});

router.post("/api/track-shipment", (request, response) => {
  ShipmentController.ShipmentLookUp(request, response);
});

export default router;
