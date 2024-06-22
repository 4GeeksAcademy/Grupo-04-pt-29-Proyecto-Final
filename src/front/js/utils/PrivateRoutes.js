import React from "react";
import { isLoggedIn } from "./isLoggedIn";
import { Outlet,Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let isAuthenticated = isLoggedIn(); 
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes