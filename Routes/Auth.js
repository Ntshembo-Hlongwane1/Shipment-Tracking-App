import express from "express";
import authController from "../Controller/Auth/AuthController";

const AuthController = new authController();
const router = express.Router();

router.post("/api/user-signup", (request, response) => {
  AuthController.SignUp(request, response);
});

router.post("/api/user-login", (request, response) => {
  AuthController.Login(request, response);
});

router.get("/api/isLoggedIn", (request, response) => {
  AuthController.isLoggedIn(request, response);
});

export default router;
