import mongoose from "mongoose";
const connectDB = async () => {
    try {
        if(mongoose.connection.readyState === 0) {
            await mongoose.connect("mongodb+srv://Manasseh:%401Tmpproductions@manassehcluster.rpkbpy1.mongodb.net/login-page?retryWrites=true&w=majority&appName=ManassehCluster");
            console.log("MongoDB connected...")
        } else {
            console.log("Using existing connection")
        }
    } catch(error) {
        console.log("Error connection to DataBase", error);
        process.exit(1)
    }
}
 
export default connectDB;