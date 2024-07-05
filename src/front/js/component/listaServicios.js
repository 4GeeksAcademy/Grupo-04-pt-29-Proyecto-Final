import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/listaServicios.css";
import rigoImage from "../../img/rigo-baby.jpg";

export const ListaServicios = ({ data, filters }) => {
    const filteredData = data.filter(item => {
        const matchesCategory =
          !filters.category ||
          item.services.some(service =>
            service.category.toLowerCase().includes(filters.category.toLowerCase())
          );
    
        const matchesPrice =
        !filters.price ||
        item.services.some(service => service.price == filters.price)
        

        const matchesLocation =
          !filters.location ||
          item.location.toLowerCase().includes(filters.location.toLowerCase());

        const matchesSelectedCategories =
            filters.selectedCategories.length === 0 ||
            item.services.some(service =>
                filters.selectedCategories.includes(service.category)
            );

            
        const matchesSelectedPrices =
            filters.selectedPrices.length === 0 ||
            item.services.some(service =>
                filters.selectedPrices == service.price
            );

        const matchesSelectedLocations =
            filters.selectedLocations.length === 0 ||
            filters.selectedLocations.includes(item.location)
            
    
        return matchesCategory && matchesPrice && matchesLocation && matchesSelectedCategories && matchesSelectedPrices && matchesSelectedLocations;
      });

      
    const e = filteredData.map((item) => (
         <div key={` ${item.id}`} className={`card mb-3 tarjeta-listaServ ${item.id}`} style={{ maxWidth: "1200px" }}>
            {item.services.map((service) => ( 
            <div className="row g-0" key={`${service.id}${service.provider_id}`}>
                <div className="col-md-4">
                    <img className="img-fluid rounded-start foto-listaServ" src={service.url_image} alt="..." />
                    <p className="card-text categoria-listaServ"><small className="text-body-secondary">{service.category}</small></p>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title titulo-listaServ">{service.title}</h5>
                            <p className="precio-listaServ">
                                <i className="fa-solid fa-dollar-sign icono-listaServ">{service.price}</i>
                            </p>
                        </div>
                        <h6 className="card-title nombre-listaServ">{item.name} {item.last_name}</h6>
                        <p className="card-text textoTarjeta-listaServ">{service.description}</p>
                        <div className="d-flex justify-content-between mt-5">
                            <p className="card-text textoIconos-listaServ"><small className="text-body-secondary"> <i className="fa-solid fa-location-dot icono-listaServ"></i>  {item.location}</small></p>
                            <p className="card-text mx-2 textoIconos-listaServ"><small className="text-body-secondary">
                                Valoración 
                                    {[...Array(service.valoration)].map((e, i) => {
                                    return <i key={i} className="fa-regular fa-star icono-listaServ" />
                                })} 
                                </small></p> 
                            <p className="card-text ml-auto textoIconos-listaServ favorito-listaServ"><small className="text-body-secondary"> Guardar  <i className="fa-regular fa-heart corazon-listaServ"></i></small></p>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    ))
    
    return e
}

