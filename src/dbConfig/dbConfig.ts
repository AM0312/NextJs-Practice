import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDb connected.');
        });

        connection.on('error',(err)=>{
            console.log(err);
            process.exit();
        });
        
    }catch(err){
        console.log(err);
    }
}