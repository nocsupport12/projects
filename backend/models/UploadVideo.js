const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadVideosSchema = new Schema(
    {
        videoUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);



module.exports =  mongoose.model("UploadVideo", UploadVideosSchema);
