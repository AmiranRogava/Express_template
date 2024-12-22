import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({

    name: String,

    surname: String,

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, { versionKey: false })

const userDB = mongoose.model("Users", userSchema)

export default userDB;