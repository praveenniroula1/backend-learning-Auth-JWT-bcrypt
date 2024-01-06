import express from "express";
import {
  insertAdminUser,
  updateOneAdminUser,
} from "../Models/adminUser/AdminUserModel.js";
import { hashPassword } from "../Helpers/bcryptHelpers.js";
import {
  userVerifiedNotification,
  verificationEmail,
} from "../Helpers/emailHelpers.js";
// import { uuid } from "uuidv4";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailValidationCode = "dsbhfjksdbhfkjs";
    const user = await insertAdminUser(req.body);

    if (user?._id) {
      res.json({
        status: "success",
        message: "We have sent you email to verify your account",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }

    res.json({
      status: "success",
      message: "Could not Create new user",
    });
  } catch (error) {
    console.log(error.message);

    if (error.message.includes("E11000 duplicate key error")) {
      error.message = "There is already another user with this email";
    }
    next();
  }
});
router.patch("/verify-email", async (req, res, next) => {
  try {
    const { emailValidationCode, email } = req.body;
    console.log(req.body);

    const user = await updateOneAdminUser(
      {
        emailValidationCode,
        email,
      },
      {
        status: "active",
        emailValidationCode: "",
      }
    );

    user._id
      ? res.json({
          status: "success",
          message: "Your Account has been verified, you may log in now",
        }) && userVerifiedNotification(user)
      : res.json({
          status: "error",
          message: "Your Account could not verified, Invalid or expired link",
        });
  } catch (error) {
    next();
  }
});

export default router;
