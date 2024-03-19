import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateAccountDetails = asyncHandler(async (req,res)=>{
    const {fullname,email} = req.body

    if(!fullname || !email){
        throw new ApiError(400,"All fields are required")
    }

    const user = User.findByIdAndUpdate(
        req.User?._id,
        {
            $set:{
                fullname,
                email
            }
        },
        {new:true}).select("-password")

        return res.status(200).json(new ApiResponse(200,user,"Account Details Updated Successfully"));
})
export {updateAccountDetails}