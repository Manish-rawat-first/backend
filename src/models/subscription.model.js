import mongoose,{Schema} from "mongoose";
const subscriptionSchema = new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,// One who is subscribing
        ref:"User"
    },
    channerl:{
        type:Schema.Types.ObjectId,
         
    }

})
export const Subscription = mongoose.model("Subscription",subscriptionSchema);