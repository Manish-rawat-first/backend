import { asyncHandler } from "../utils/asyncHandler.js";

const getCurrent = asyncHandler(async(req,res)=>{
return res.status(200).json(200,req.user,"current user fetched successfully")
}) 
export {getCurrent}