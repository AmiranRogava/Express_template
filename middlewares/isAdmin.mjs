
import bcrypt from "bcrypt"


import userDB from "../models/userModel.mjs"

export async function checkAdmin(req, res, next) {
    try {

        let { email, password } = req.body

        const found = await userDB.findOne({ email })

        if (!found || !(await bcrypt.compare(password, found.password))) {
            return res.status(401).json({ msg: "Unauthorized" })
        }

        if (found.role !== "admin") {
            return res.status(403).json({ msg: "user doesn't have permission" })
        }

        next()

    } catch (err) {
        console.error("error while checkAdmin")
        res.status(500).json({ error: 'Internal server Error' })
    }
}

export default { checkAdmin }