import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefreshToken } from "./user.controllers.js";

const loginUser = asyncHandler(async(req,res)=>{
    //req body -> data
    //user name or email
    //find the user
    //password check
    //access and refresh token
    //send cookie 
    const {email, username, password } = req.body;
    console.log(email + " " + username + " " + password);

    if (!username || !email) {
        throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist in Database");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid User credential");
    }
 
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findByIdAndUpdate(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: false
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken, refreshToken
            },
                "User logged in Successfully"
            )
        );
});
export{loginUser}
