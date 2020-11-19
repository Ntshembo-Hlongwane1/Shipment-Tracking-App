import nodemailer from "nodemailer";
import Formidable from "formidable";
import { userModel } from "../../Models/Users/Users";
import dotenv from "dotenv";
import Bcrypt from "bcrypt";
dotenv.config();
class AccountRecoveryController {
  RequestPasswordReset(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        const { email } = fields;
        if (error) {
          return response.status(500).json({
            msg:
              "Network error failed to request password reset try again later",
          });
        }

        const isUserExisting = await userModel.findOne({ email: email });

        if (!isUserExisting) {
          return response
            .status(400)
            .json({ msg: "Account with this email does not exist" });
        }

        const transporter = nodemailer.createTransport({
          service: "SendinBlue",
          auth: {
            user: process.env.sendinBlue__email,
            pass: process.env.sendinBlue__key,
          },
        });

        const mailOptions = {
          from: process.env.sendinBlue__email,
          to: email,
          subject: "Password Reset",
          html: `

                <h1>Click link below to start your password reset process</h1>
                <a href="http://127.0.0.1:3000/password-reset/${isUserExisting.email}/${isUserExisting._id}">Reset Password</a>
            
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            return response.status(500).json({
              msg:
                "Network error could failed to send email please try again later",
            });
          }

          return response.status(200).json({
            msg: `Email has to sent to ${email} for guideline to reset password`,
            redirected: true,
          });
        });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server is currently down please try again" });
    }
  }

  ResetPassword(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response.status(500).json({
            msg: "Network error failed to reset password please try again",
          });
        }

        const { user_email, user_id, password } = fields;

        const isUserExisting = await userModel.findOne({
          email: user_email,
          _id: user_id,
        });

        const hashedPassword = isUserExisting.password;
        const isPasswordEqualToPrevious = await Bcrypt.compare(
          password,
          hashedPassword
        );

        if (isPasswordEqualToPrevious) {
          return response
            .status(400)
            .json({ msg: "Password cannot be the same as previous" });
        }
        const salt = await Bcrypt.genSalt(15);
        const newHashedPassword = await Bcrypt.hash(password, salt);

        isUserExisting.password = newHashedPassword;

        const updatedDocument = await userModel.findOneAndUpdate(
          { email: user_email, _id: user_id },
          isUserExisting,
          {
            new: true,
          }
        );

        return response
          .status(200)
          .json({ msg: "Password reset was successful" });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Server is currently down please try again later" });
    }
  }
}

export default AccountRecoveryController;
