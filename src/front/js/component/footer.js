import React from "react";
import '../../styles/footer.css';

export const Footer = () => (
	<footer className="footer-app footer text-center pt-5">
		<div className="container d-flex flex-column align-items-center elemento">
			<img src="https://res.cloudinary.com/dq3mxxidu/image/upload/v1719854947/white-logo-serviexpert_xuiacu.png" style={{ "width": "40%" }} className="img-fluid" />
			<p className="parrafo" style={{ "width": "70%" }}>consiste en un sitio web donde personas con distintas profesiones u oficios,  como por ejemplo, plomeros, carpinteros, cerrajeros, etc., pueden ofrecer sus servicios a los usuarios o clientes que se registren en el sitio. En este sentido la plataforma pretende ser un enlace entre personas que necesitan algún servicio en especifico y las personas que están dispuestas a cubrir esta necesidad..</p>
			<div className="linea mt-3 mb-4"></div>
			<p className="mb-5">Copyright © 2024. ServiExpert. All Rights Reserved</p>
		</div>
	</footer>
);
