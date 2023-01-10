import mongoose from 'mongoose';

const connectDB = async ()=>{
    mongoose.set('strictQuery', false);

    return await mongoose
    .connect(`mongodb+srv://mahmoud:mahmoud123@cluster0.n8dhy02.mongodb.net/transport`)
    .then((res)=>console.log(`connected DB on ......`))
    .catch((err) => console.log(`Fail toconnected DB on ......... ${err}`));

};

export default connectDB;


///mongodb://localhost:27017
////mongodb+srv://mahmoud:mahmoud123@cluster0.n8dhy02.mongodb.net/transport
///mongodb://0.0.0.0:27017/trans