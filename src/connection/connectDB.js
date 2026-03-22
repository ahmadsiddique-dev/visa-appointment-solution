const mongoose = require("mongoose")


async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log('Mongodb Connection successful');
    } catch (error) {
        console.log("Something went wrong while connecting to db");
    }
}


module.exports = connectDB;