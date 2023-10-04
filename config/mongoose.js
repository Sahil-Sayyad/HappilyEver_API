const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Conneted Successfully`);
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}
module.exports = connectDB;