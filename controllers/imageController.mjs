// controllers/imageController.mjs
import ImageDB from "../models/imageModel.mjs";

async function uploadImage(req, res) {
    try {
        const { userId, image } = req.body; // `userId` and Base64 `image` are sent in the request body

        if (!userId || !image) {
            return res.status(400).json({ msg: "User ID and image are required" });
        }

        // Create a new image document
        const newImage = new ImageDB({
            userId,
            imageBase64: image,
        });

        // Save the image to the database
        await newImage.save();

        res.status(201).json({ msg: "Image uploaded successfully!", imageId: newImage._id });

    } catch (err) {
        console.error("Error while uploading image", err);
        res.status(500).json({ msg: "Internal server error", error: err.message });
    }
}
async function imageSend(req, res) {
    try {
        // Assuming the _id is passed in the request parameters or hardcoded as you have here
        const image = await ImageDB.findOne({ _id: "6754a4555f0bac4bd82ae26b" });

        // Check if the image was found
        if (!image) {
            return res.status(404).json({ msg: "Image not found" });
        }

        // Send the image (you can send the base64 string directly or other image data as needed)
        res.status(200).json({ image: image.imageBase64 });

    } catch (err) {
        console.error("Error while sending image", err);
        res.status(500).json({ msg: "Internal server error", error: err.message });
    }
}


export  default{
    uploadImage,
    imageSend
}