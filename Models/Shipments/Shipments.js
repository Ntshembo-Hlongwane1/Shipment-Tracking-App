import mongoose from "mongoose";

const shipmentSchema = mongoose.Schema({
  owner_email: { type: String, required: true },
  owner_firstname: { type: String, required: true },
  owner_lastname: { type: String, required: true },
  shipment_orders: { type: Array, required: true },
});

export const shipmentModel = mongoose.model("shipmentModel", shipmentSchema);
