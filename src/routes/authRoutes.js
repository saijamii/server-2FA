import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register); // Registration Route

router.post("/login", passport.authenticate("local"), login); // Login Route

router.post("/logout", logout); // Logout Route

router.get("/status", authStatus); // Auth Status Route

router.post(
  "/2fa/setup",
  (req, res, next) => {
    console.log("Is Authenticated:", req.isAuthenticated?.());
    console.log("Session:", req.session);
    console.log("User:", req.user);
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({
      message: "Unauthorized",
    });
  },
  setup2FA
); // 2FA setup

router.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({
      message: "Unauthorized",
    });
  },
  verify2FA
); // verify 2FA

router.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({
      message: "Unauthorized",
    });
  },
  reset2FA
); // reset 2FA

export default router;
