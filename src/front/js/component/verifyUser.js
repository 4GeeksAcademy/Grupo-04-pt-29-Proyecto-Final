import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const VerifyUser = () => {
    const location = new URLSearchParams(useLocation().search)
    console.log(location) 
    
    console.log()
    useEffect(()=>{
        const userVerification = async (verifyToken) => {
            try {
                const response= await fetch(process.env.BACKEND_URL + "/api/verify",
                    {
                        method:"GET",
                        headers:{
                            "content-type":"application/json",
                            Authorization:`Bearer ${verifyToken}`
                        }
                    }
                );
                const data=await response.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        if(location.get("verify_token")){
            userVerification(location.get("verify_token"))
        }
    },[])

        return (
            <div className="VerifyUsercontainer ">

            </div>
        );
    };

    export default VerifyUser;
