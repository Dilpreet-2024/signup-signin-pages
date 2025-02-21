import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router();
import { registerUser } from "../controllers/user.controllers.js";
import { loginUser } from "../controllers/user.controllers.js";
import { changePassword } from "../controllers/user.controllers.js";
import { getUsers } from "../controllers/user.controllers.js";
import { logoutUser } from "../controllers/user.controllers.js";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
router.route('/first').post(upload.fields([
    {
        name:'photo',
        maxCount:1
    }
]),registerUser);
router.route('/second').post(loginUser);
router.route('/third').post(changePassword);
router.route('/fourth').get(getUsers);
router.route('/fifth').post(jwtVerify,logoutUser);
export default router;
