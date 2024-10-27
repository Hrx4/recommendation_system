import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
     }, 
     category : {
        type : String,
        required : true
   } ,
    thumbnail : {
        type : String,
        required : true
   },
   embeddings : {
       type : Array,
       required : true
   }
   
});

export const Video = mongoose.models.Videos ||  mongoose.model("Videos", VideoSchema);