
import userDB from "../models/userModel.mjs"
import bcrypt from "bcrypt"

export async function reg(req, res) {
    try {
        const { user } = req.body

        const exists = await userDB.findOne({email: user.email})

        if(exists){
            res.status(409).json({msg:"user already exists"})
        }
        user.password = await bcrypt.hash(user.password,10)
  
        const newUser = new userDB(user)

        await newUser.save()

        res.status(201).json({msg:"user added successfully!"})

    } catch (err) {
        console.error("error while registering user",err)
        res.status(500).json({ error: 'Internal server Error' })
    }
}

export async function change(req, res) {
    try {
        const { user } = req.body

        const exists = await userDB.findOne({email: user.email})

        if(!exists){
            res.status(409).json({msg:"user not exists"})
        }
        user.password = await bcrypt.hash(user.password,10)

        Object.assign(exists,user)

        await exists.save()

        res.status(201).json({msg:"user changed successfully!"})

    } catch (err) {
        console.error("error while changing user",err)
        res.status(500).json({ error: 'Internal server Error' })
 
    }
}

export async function del(req, res) {
    try {
        const id = req.params.id

        const exists = await userDB.findOne({_id: id})

        if(!exists){
            res.status(409).json({msg:"user not exists"})
        }
        
        await userDB.findOneAndDelete({_id: id})

        res.status(201).json({msg:"user deleted successfully!"})

    } catch (err) {
        console.error("error while deleting user",err)
        res.status(500).json({ error: 'Internal server Error' })
    }
}
export default {
    reg,
    change,
    del
}