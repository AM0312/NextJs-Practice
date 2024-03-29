"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";


export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    });
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setLoading]=React.useState(false);

    const onLogin=async ()=>{
        try{
            setLoading(true);
            const response=await axios.post("/api/users/login",user);
            console.log("Login successful",response.data);
            toast.success("Login Success");
            router.push("/profile");
        }catch(err:any){
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>{loading?"Processing":"Login"}</h1>
                <hr />
                <label htmlFor="email">Email</label>
                <input className="p-2 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="email" 
                    id="email" 
                    value={user.email}
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    placeholder="email"
                />
                <label htmlFor="password">Password</label>
                <input className="p-2 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="password" 
                    id="password" 
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                    placeholder="password"
                />
                <button
                    onClick={onLogin}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                        {buttonDisabled?"Enter Data First":"Login"}
                </button>
                <Link href="/signup">Visit Signup Page</Link>
            </div>
        </>
    )
}