import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ListaServicios } from "../component/listaServicios";
import { BarraCategorias } from "../component/barraCategorias";



export const ProductsPage = () => {

	return (
		<div className="container"> 
			<div className="pt-3 pb-3"> Inicio - Categoria - Limpieza </div> 
			<div className="d-flex">
				<div className="m-3">
					<BarraCategorias />
				</div>
				<div className="m-3">
					<ListaServicios />
				</div>
			</div>
		</div>
	);
};
