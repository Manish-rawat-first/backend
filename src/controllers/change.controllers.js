import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword,confPassword} = req.body

    if(!(newPassword === confPassword)){
        throw new ApiError(400,"Password Mismatch")
    }

    const user = await User.findById(req.User?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old Password")
    }

    user.password = newPassword

    await user.save({validateBeforeSave: false})

    return res.status(200).json(new ApiResponse(200,{},"Password changed successfully"))


})

export {changeCurrentPassword};