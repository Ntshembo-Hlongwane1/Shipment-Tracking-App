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

router.get("/api/all-pending-shipments", (request, response) => {
  ShipmentController.GetAllPending(request, response);
});

router.get("/api/all-delivered-shipments", (request, response) => {
  ShipmentController.GetAllDelivered(request, response);
});

router.post("/api/update-status/:id", (request, response) => {
  ShipmentController.UpdateStatus(request, response);
});

export default router;
