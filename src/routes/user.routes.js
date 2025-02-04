import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router();
import { registerUser } from "../controllers/user.controllers.js";
import { loginUser } from "../controllers/user.controllers.js";
import { forgetUser } from "../controllers/user.controllers.js";
import { getUsers } from "../controllers/user.controllers.js";
router.route('/first').post(upload.fields([
    {
        name:'photo',
        maxCount:1
    }
]),registerUser);
router.route('/second').post(loginUser);
router.route('/third').post(forgetUser);
router.route('/fourth').get(getUsers);
export default router;
