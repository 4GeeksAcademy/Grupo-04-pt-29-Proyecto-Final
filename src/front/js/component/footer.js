import React from "react";
import '../../styles/footer.css';

export const Footer = () => (
	<footer className="footer-app footer text-center pt-5">
		<div className="container d-flex flex-column align-items-center elemento">
			<img src="https://res.cloudinary.com/dq3mxxidu/image/upload/v1719854947/white-logo-serviexpert_xuiacu.png" style={{ "width": "40%" }} />
			<p className="parrafo" style={{ "width": "70%" }}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrón.</p>
			<div className="linea mt-3 mb-4"></div>
			<p className="mb-5">Copyright © 2024. ServiExpert. All Rights Reserved</p>
		</div>
	</footer>
);
