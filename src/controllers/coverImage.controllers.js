import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";

const updateCoverImage = asyncHandler(async (req,res)=>{
    const coverLocalPath = req.file?.path;

    if(!coverLocalPath){
        throw new ApiError(400,"Cover Image is Missing")
    }

    const coverImage = await uploadOnCloudinary(coverLocalPath);

    if(!coverImage.url){
        throw new ApiError(400,"Error while uploading on coverImage")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage:coverImage.url
            }

        },
        {new:true}
    )

    return res.status(200).json(new ApiResponse(200,user,"Cover Image Updated Successfully"));

})
export {updateCoverImage}