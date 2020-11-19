import Bcrypt from "bcrypt";
import Formidable from "formidable";
import { userSessions } from "../../Models/UserSessions/UserSessions";
import { userModel } from "../../Models/Users/Users";

class AuthController {
  SignUp(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network error please try again" });
        }

        const { firstname, lastname, email, password } = fields;

        if (!firstname || !lastname || !email || !password) {
          return response
            .status(400)
            .json({ msg: "All fields have to be entered" });
        }

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const isEmailVaild = re.test(email);
        if (!isEmailVaild) {
          return response
            .status(400)
            .json({ msg: "Email has to be a valid one" });
        }

        const isUserExisting = await userModel.findOne({ email: email });
        if (isUserExisting) {
          return response
            .status(400)
            .json({ msg: "Account with this email already exist" });
        }

        const salt = await Bcrypt.genSalt(15);
        const hashedPassword = await Bcrypt.hash(password, salt);

        const newUser = new userModel({
          firstname,
          lastname,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();

        return response.status(201).json({ msg: "User registered" });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server is currently down please try again later" });
    }
  }

  Login(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network error please try again later" });
        }

        const { email, password } = fields;

        if (!email || !password) {
          return response
            .status(400)
            .json({ msg: "All fields have to be entered" });
        }

        const isUserExisting = await userModel.findOne({ email: email });

        if (!isUserExisting) {
          return response
            .status(404)
            .json({ msg: "Account with this email does not exist" });
        }

        const hashedPassword = isUserExisting.password;
        const isPasswordValid = await Bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) {
          return response.status(400).json({ msg: "Invalid credentials" });
        }

        const isUserSessionAvailable = await userSessions.findOne({
          "session.user.email": email,
        });

        if (isUserSessionAvailable) {
          return response.status(200).json({ msg: "Already logged in" });
        }

        request.session.user = {
          email: email,
          _id: isUserExisting._id,
          isCustomer: isUserExisting.isCustomer,
          isAdmin: isUserExisting.isAdmin,
        };
        response.send(request.session);
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again later" });
    }
  }

  isLoggedIn(request, response) {
    const user = request.session.user || false;

    try {
      if (!user) {
        return response.status(400).json({ authenticated: false });
      }
      return response.status(200).json({
        authenticated: true,
        isCustomer: user.isCustomer,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server currently down please try again" });
    }
  }
}

export default AuthController;
