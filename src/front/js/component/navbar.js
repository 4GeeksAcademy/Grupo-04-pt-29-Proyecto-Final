import React from "react";
import { Link } from "react-router-dom";
import "../../styles/nabvar.css";
import { isLoggedIn } from "../utils/isLoggedIn";

export const Navbar = () => {
	
	return (
		<div className="bg-white">
		<div className="Navbar">
		<header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2">
		  <div className="col-md-3 mb-2 mb-md-0">
			<a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
			 <img className="mt-3" src= "https://res.cloudinary.com/dq3mxxidu/image/upload/v1719006034/logo_ecy7em.jpg"style={{height:"51px", width:"250px"}} />
			</a>
		  </div>

		  { !isLoggedIn() ?
		  <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 menu">
			<li><a href="#" className=" px-3 active">Inicio</a></li>
			<li><a href="#" className=" px-3">Sobre Nosotros</a></li>
			<li><a href="/signup" className=" px-3">Regístrate</a></li>
			<li><a href="/login" className=" px-3">Iniciar Sesión</a></li>
		  </ul> : ""
		  }
		  
			{isLoggedIn() ?  
			<div className="col-md-3 text-end ">
			<button className="btn" style={{fontSize: "22px"}}> <i className="px-3 fa-regular fa-heart"></i></button>
			 <button className="btn" style={{fontSize: "22px"}}><i className="fa-solid fa-user"></i></button> 
			  </div> : "" 
			}

		</header>
	  </div>
	  </div>
	);
};
