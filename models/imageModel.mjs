// models/imageModel.mjs
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageBase64: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const ImageDB = mongoose.model("Image", imageSchema);

export default ImageDB;
