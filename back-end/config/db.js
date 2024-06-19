import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ghoufranhachlaf:5sUSTsRCYzwFtbQy@cluster0.rcblzi4.mongodb.net/food-del')
        .then(() => console.log("connected to db"));
    }