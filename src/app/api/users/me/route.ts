import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest){
    try{
        const id=await getDataFromToken(request);
        const user=await User.findOne({_id:id}).select("-password");
        return NextResponse.json({
            message:"User Found",
            data:user
        });
    }catch(err:any){
       return NextResponse.json({error:err.message},{status:400});
    }
}