import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "../pages/login";
import "../../styles/login.css";


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
                <div className="d-flex justify-content-center">
                <p className="bienvenida-verify pt-5">¡Felicidades! Has verificado exitosamente tu cuenta. <br/>
                    Ahora puedes disfrutar de todas las funcionalidades y beneficios que te ofrecemos. <br/>
                    ¡Gracias por confiar en nosotros!</p>
                </div>
                <Login/>
            </div>
        );
    };

    export default VerifyUser;
