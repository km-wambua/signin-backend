import connectDB from "@/db/connect";
import { headers } from "next/headers";
import User from "@/db/Usermodel"
const jwt = require("jsonwebtoken");
const secret = "loginpage123"

export async function POST() {
    connectDB();

    const headerList = headers();
    const token = headerList.get("Authorization");

    if(!token) {
        return Response.json({success: false, msg: "Unauthorized!"});
    }
    try { 

        const data = await jwt.verify(token, secret);

        let user = await User.findById(data).select("-password");
        if(!user) {
            return Response.json({success: false, msg: "Unauthorized!"});
        }
        return Response.json({success: true, user})

    } catch(error) {
        return Response.json({success: false, msg: "Invalid token"})
    }
}