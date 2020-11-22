import Formidable from "formidable";
import { shipmentModel } from "../../Models/Shipments/Shipments";
import { userModel } from "../../Models/Users/Users";
import twilio from "twilio";
class ShipmentsController {
  RequestShipment(request, response) {
    const form = new Formidable.IncomingForm();
    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response.status(500).json({
            msg:
              "Network error failed to request shipment please try again later",
          });
        }

        const { city, area, fullAddress, province, weight } = fields;

        if (!weight || !fullAddress) {
          return response
            .status(400)
            .json({ msg: "All fields specified are required" });
        }

        const user_obj = request.session.user;
        const user_id = user_obj._id;

        const user = await userModel.findOne({ _id: user_id });

        const user_firstname = user.firstname;
        const user_lastname = user.lastname;
        const user_email = user.email;

        const newShipRequest = new shipmentModel({
          owner_email: user_email,
          owner_firstname: user_firstname,
          owner_lastname: user_lastname,
          shipment_orders: {
            weight: parseInt(weight),
            city: city,
            area: area,
            province: province,
            fullAddress: fullAddress,
            status: "Pending Action",
          },
        });

        const savedShipmentRequest = await newShipRequest.save();

        return response.status(201).json({
          msg: `Shipment request made, track shipment with this ID: ${savedShipmentRequest._id}`,
        });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currentlu down please try again later" });
    }
  }

  ShipmentLookUp(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response.status(500).json({
            msg:
              "Network error failed to lookup you shipment order try again later",
          });
        }

        const { shipment_id } = fields;

        const shipment_order = await shipmentModel.findOne({
          _id: shipment_id,
        });

        if (!shipment_order) {
          return response
            .status(404)
            .json({ msg: "Shipment order does not exist" });
        }

        return response.status(200).json(shipment_order);
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server is currently down please try again later" });
    }
  }

  async GetAllPending(request, response) {
    try {
      const data = await shipmentModel.find();

      const filteredData = data.filter(
        (info) => info.shipment_orders.status !== "Delivered"
      );

      return response.status(200).json(filteredData);
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server curretly down please try again later" });
    }
  }

  async GetAllDelivered(request, response) {
    try {
      const data = await shipmentModel.find();

      const filteredData = data.filter(
        (info) => info.shipment_orders.status === "Delivered"
      );

      console.log(filteredData);
    } catch (error) {
      return response
        .status(400)
        .json({ msg: "Server is currently down please try again" });
    }
  }

  async UpdateStatus(request, response) {
    const form = new Formidable.IncomingForm();
    try {
      const shipment_id = request.params.id;
      const shipment = await shipmentModel.findOne({ _id: shipment_id });

      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response.status(500).json({
            msg:
              "Network Error: Failed to change status please try again later",
          });
        }

        const { status } = fields;
        const previous_shipemnt_status = shipment.shipment_orders.status;
        shipment.shipment_orders.status = status;
        const current_shipment_status = shipment.shipment_orders.status;
        const updated_document = await shipmentModel.findOneAndUpdate(
          { _id: shipment_id },
          shipment,
          { new: true }
        );

        const twilio__AccountSiD = process.env.twilio__accountSiD;
        const twilio__authToken = process.env.twilio__authToken;
        const client = twilio(twilio__AccountSiD, twilio__authToken);

        const messageOptions = {
          body: `Your shipment order with order id: ${shipment_id} changed status from ${previous_shipemnt_status} to ${current_shipment_status}`,
          from: process.env.twilio__number,
          to: process.env.test__number,
        };
        client.messages.create(messageOptions, (error, results) => {
          if (error) {
            console.log(error);
          } else {
            return response
              .status(200)
              .json({ msg: "Status Successfully Changed" });
          }
        });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server is currently down please try again later" });
    }
  }
}

export default ShipmentsController;
