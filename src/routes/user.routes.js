import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { logoutUser } from "../controllers/logoutUser.js";
import { loginUser } from "../controllers/loginUser.js";
import { upload } from "../middlewares/multer_middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1

        },
        {
            name:"coverImage",
            maxCount:1

        }
    ]),
    registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
export default router;