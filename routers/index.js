import express from "express";
import passport from "passport";
import permit from "../middleware/authorization";

import {
  userController,
  permissionController,
  roleController,
} from "../controllers";
import { DefaultData } from "../models/DefaultData";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/login", userController.postLogin);
router.post("/signup", userController.postSignup);

router.get(
  "/getAllUser",
  passport.authenticate("jwt", { session: false }),
  permit(DefaultData.permissions.Permission_UserRead),
  userController.getAllUser
);

router.post(
  "/addRole",
  passport.authenticate("jwt", { session: false }),
  permit(DefaultData.permissions.Permission_RoleWrite),
  roleController.addRole
);
router.post(
  "/updateRole",
  passport.authenticate("jwt", { session: false }),
  permit(DefaultData.permissions.Permission_RoleWrite),
  roleController.updateRole
);
router.get(
  "/getAllRole",
  passport.authenticate("jwt", { session: false }),
  permit(DefaultData.permissions.Permission_RoleRead),
  roleController.all
);

router.get("/getAllPermission", permissionController.all);

export default router;
