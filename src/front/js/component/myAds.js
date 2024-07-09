import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import "../../styles/listaServicios.css";
import rigoImage from "../../img/rigo-baby.jpg";

const MyAds = () => {
    const {id}= useParams()

    const { store, actions } = useContext(Context);
    useEffect(()=>{
        actions.getProviderByUserID(id)
      },[])
    

    return ( 
    <div>
        {store?.provider?.services?.map((service)=>{
            return <div className="card container mb-3 tarjeta-listaServ" key={service.id} style={{ maxWidth: "810px" }} > 
                 <div className="row g-0">
                    <div className="col-md-4">
                     {/* <img className="img-fluid rounded-start foto-listaServ" src={provider.url_image} alt="..." /> */}
                        <img
                            src={service.url_image}
                            alt=""
                            className="img-fluid pt-4 rounded"
                            style={{
                               
                                width: "150px",
                                height: "150px",
                                backgroundSize: "cover"
                            }}
                        />
                        <p className="card-text categoria-listaServ"><small className="text-body-secondary">{service.category}</small></p>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="card-title titulo-listaServ">{service.title}</h5>
                                <p className="precio-listaServ">
                                    <i className="fa-solid fa-dollar-sign icono-listaServ">
                                    </i>{service.price}</p>
                            </div>
                            <h6 className="card-title nombre-listaServ">{store.provider.name} {store.provider.last_name}</h6> 
                            <p className="card-text textoTarjeta-listaServ">{service.description}</p>
                            <div className="d-flex justify-content-between mt-5">
                                <p className="card-text textoIconos-listaServ"><small className="text-body-secondary"> <i className="fa-solid fa-location-dot icono-listaServ"></i>  {store.provider.location}</small></p>
                                {/* <button onClick={()=>actions.deleteService(service.id)}><i class="fa-solid fa-trash fa-lg"></i></button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })}
    </div>
        // <div className="myAds container ">
        //     <div  className="card  container mb-3 tarjeta-listaServ" style={{ maxWidth: "810px" }}>
        //        
        //     </div>
        //     <br />
        // </div>
    );
};
export default MyAds;
