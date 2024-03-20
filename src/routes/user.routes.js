import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { logoutUser } from "../controllers/logout.controllers.js";
import { loginUser } from "../controllers/login.controllers.js";
import { upload } from "../middlewares/multer_middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshToken } from "../controllers/refresh.controllers.js";
import { changeCurrentPassword } from "../controllers/change.controllers.js";
import { getCurrent } from "../controllers/getCurrent.controllers.js";
import {updateAccountDetails } from "../controllers/update.controllers.js";
import { updateUserAvatar } from "../controllers/updateAvatar.controllers.js";
import { updateCoverImage } from "../controllers/coverImage.controllers.js";
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
    registerUser);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
//refresh token
router.route("/refresh-token").post(refreshToken)
//change Password
router.route('/change-Password').post(changeCurrentPassword)

// get Current User
router.route('/getCurrent').post(getCurrent)

router.route('/update').post(updateAccountDetails)
//avatar update
router.route('/avatar').post(updateUserAvatar)

router.route('/coverImage').post(updateCoverImage)
export default router;