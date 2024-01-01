"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";


export default function SignupPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    });

    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setLoading]=React.useState(false);

    const onSignup=async ()=>{
        try{
            setLoading(true);
            const response=await axios.post("/api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login");
        }catch(err:any){
            toast.error(err.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>{loading ? "Processing":"Signup"}</h1>
                <hr />
                <label htmlFor="username">Username</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="text" 
                    id="username" 
                    value={user.username}
                    onChange={(e)=>setUser({...user,username:e.target.value})}
                    placeholder="username"
                />
                <label htmlFor="email">Email</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="email" 
                    id="email" 
                    value={user.email}
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    placeholder="email"
                />
                <label htmlFor="password">Password</label>
                <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="password" 
                    id="password" 
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                    placeholder="password"
                />
                <button
                    onClick={onSignup}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                        {buttonDisabled ? "Enter Required Data":"Signup Here"}
                    </button>
                    <Link href="/login">Visit Login Page</Link>
            </div>
        </>
    )
}