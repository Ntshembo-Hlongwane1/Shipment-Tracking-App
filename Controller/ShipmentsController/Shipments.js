import Formidable from "formidable";
import { shipmentModel } from "../../Models/Shipments/Shipments";
import { userModel } from "../../Models/Users/Users";

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
            weight: weight,
            city: city,
            area: area,
            province: province,
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
}

export default ShipmentsController;
