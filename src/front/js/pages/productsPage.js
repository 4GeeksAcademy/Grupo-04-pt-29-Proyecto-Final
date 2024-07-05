import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { ListaServicios } from "../component/listaServicios";
import { BarraCategorias } from "../component/barraCategorias";



export const ProductsPage = () => {
	const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getProviders()
    }, [])

	const [filters, setFilters] = useState({
		category: '',
		price: '',
		location: '',
		selectedCategories: [],
		selectedPrices: [],
		selectedLocations: [],
	});
	
	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
	};
	const data = store.listProviders

	return (
		<div className="container"> 
			<div className="pt-3 pb-3"> Inicio - Servicios Disponibles </div> 
			<div className="d-flex">
				<div className="m-3">
					<BarraCategorias filters={filters} onFilterChange={handleFilterChange} />
				</div>
				<div className="m-3">
					<ListaServicios data={data} filters={filters} />
				</div>
			</div>
		</div>
	);
};
