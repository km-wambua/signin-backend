import connectDB from "@/db/connect";
import User from "@/db/Usermodel";
const jwt = require("jsonwebtoken");
const secret = "loginpage123";

export async function POST(Request) {
    await connectDB();
    try {
        const data = await Request.json();
        console.log(data)
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        });
        console.log(user)
        const token = jwt.sign(user.id, secret)
        console.log("Token: ", token)
        
        return new Response("", {
            status: 200,
            headers: {Authorization: token},
        });
    } catch(error) {
        console.log(error.message)
    }
}