import { Router } from "express";
const router=Router();
import { registerUser } from "../controllers/user.controllers.js";
import { loginUser } from "../controllers/user.controllers.js";
import { forgetUser } from "../controllers/user.controllers.js";
router.route('/first').post(registerUser);
router.route('/second').post(loginUser);
router.route('/third').post(forgetUser);
export default router;
