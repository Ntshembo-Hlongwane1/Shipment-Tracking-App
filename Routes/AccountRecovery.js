import express from "express";
import accountRecoveryController from "../Controller/AccountRecovery/AccountRecovery";

const router = express.Router();
const AccountRecoveryController = new accountRecoveryController();

router.post("/api/request-password-reset", (request, resposne) => {
  AccountRecoveryController.RequestPasswordReset(request, resposne);
});

router.post("/api/password-reset", (request, response) => {
  AccountRecoveryController.ResetPassword(request, response);
});

export default router;
