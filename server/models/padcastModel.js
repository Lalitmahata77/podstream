import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
},{timestamps : true})


const poadcastSchema = new mongoose.Schema({
    name : {type : String, required : true},
    image : {type : String, required : true},
    description : {type : String, required : true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category",  },
    reviews : [reviewSchema],
    rating : {
        type : Number,
        required : true,
        default : 0
    },
    numReviews : {
        type : Number,
        required : true,
        default : 0
    },
},{timestamps : true})

const Podcast = mongoose.model("Podcast", poadcastSchema)
export default Podcast