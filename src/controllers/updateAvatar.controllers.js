import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";

const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is Missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400,"Error While uploading on avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: {
            avatar:avatar.url

            } 
       ,},
        {new :true}
    ).select("-password")

    return user.status(200,user,"Avatar Image Updated Successfully")
})
export {updateUserAvatar}