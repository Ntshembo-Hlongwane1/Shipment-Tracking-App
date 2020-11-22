import mongoose from "mongoose";

const shipmentSchema = mongoose.Schema({
  owner_email: { type: String, required: true },
  owner_firstname: { type: String, required: true },
  owner_lastname: { type: String, required: true },
  shipment_orders: { type: Object, required: true },
  current_location: { type: Array, default: ["Gauteng"] },
  deliverer: { type: String, default: "" },
  pickup_time: { type: String, default: "" },
  arrival_time: { type: String, default: "" },
});

export const shipmentModel = mongoose.model("shipmentModel", shipmentSchema);
