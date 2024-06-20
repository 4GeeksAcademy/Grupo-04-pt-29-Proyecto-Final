import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/listaServicios.css";



export const ListaServicios = () => {

    return (
        <div className="card mb-3 tarjeta-listaServ" style={{"max-width": "720px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img className="img-fluid rounded-start foto-listaServ" src="https://th.bing.com/th/id/R.b58d4c7d84b44cdcc0c1ac7d5b2077f3?rik=Agj3WJ56ae3eSQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-6fIRzTkJZo4%2fTovWZ9RcK4I%2fAAAAAAAABzg%2fE8MDXobSP54%2fs1600%2f38871-hi-Bob_Marley2.jpg&ehk=iCt%2bUNejxrZAkWXpudRWj6YRwHm780SG0u60%2b1xd9dk%3d&risl=&pid=ImgRaw&r=0" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title titulo-listaServ">Servicio de limpieza</h5>
                            <p className="precio-listaServ"><i className="fa-solid fa-dollar-sign icono-listaServ"></i>15</p>
                        </div>
                        <h6 className="card-title nombre-listaServ">Lorena Caicedo</h6>
                        <p className="card-text textoTarjeta-listaServ">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between mt-5">
                            <p className="card-text textoIconos-listaServ"><small className="text-body-secondary"> <i className="fa-solid fa-location-dot icono-listaServ"></i> Quito</small></p>
                            <p className="card-text mx-2 textoIconos-listaServ"><small className="text-body-secondary"> Valoración <i className="fa-regular fa-star icono-listaServ"></i></small></p>
                            <p className="card-text ml-auto textoIconos-listaServ"><small className="text-body-secondary"> Guardar <i className="fa-regular fa-heart corazon-listaServ"></i></small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

