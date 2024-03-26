import express from "express";

import { 
    changePassword,
    login,
    logout,
    register 
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout);
router.route("/change-password").put(isAuthenticated,changePassword);





export default router;