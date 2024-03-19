import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "./user.controllers.js";
import { options } from "../Option/option.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const refreshToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,process.env.process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id);
    
        if(!user){
            throw new ApiError(401,"Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh Token is Expired or used")
        }
    
        
        const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(user._id);
    
        return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newRefreshToken,options).json(new ApiResponse({accessToken,refreshToken},"Access Token Refres"));
        
    } catch (error) {
        throw new ApiError(401,error?.message ||"invalid refresh token")
    }

   
})
export {refreshToken}