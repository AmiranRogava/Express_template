import express from "express"
import cors from "cors"
import bodyparser from "body-parser"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()


mongoose.connect(process.env.MONGO_URL,{
    serverSelectionTimeoutMS:30000
})

import userDB from "./models/userModel.mjs"
import ImageDB from "./models/userModel.mjs"

import { routes } from "./routes.mjs"


const app = express()

app.use(cors())

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

const port = process.env.PORT || 8000


routes(app,{userDB,ImageDB})

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`)
})

