import React from "react";
import "../../styles/detallePrimeraParte.css";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import Serviciospopulares from "./serviciosPopulares";
const DetallePrimeraParte = () => {

  const { store, actions } = useContext(Context)
  const params = useParams()
  let providerStore = store.provider


  useEffect(() => {
    actions.getSingleProvider(params.idProvider)
  }, [])





  return (
    <div>
    <>
      {store.provider.length != 0 ?
        <div className="container py-5 ">
          <div className=" col-12 container-detalleprimeraparte">
            <div className="col-12 col-sm-12 col-md-6"><img className="img-detalleprimeraparte" src={providerStore[0].data.url_image}  /></div>
            <div className="col-xl-6 col-sm-12 col-md-8 d-flex align-items-center justify-content-center">
              <div>
                <div><p className="title-dpp">{store.provider[0].data.name} {store.provider[0].data.last_name}</p></div>
                <div><p className="price-ddp">${store.provider[0].data.services[0].price}</p></div>
                <div><p className="detalles-ddp">Detalles | {store.provider[0].data.services[0].category}</p></div>
                <div><p className="detalle-parrafo-ddp">{store.provider[0].data.services[0].description}.</p></div>
                <div className="gap-3 pt-3">
                 

                  <button type="button" class="button-style-right" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Contacto
                  </button>
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Número de proveedor</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          {store.provider[0].data.phone}
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="button-style-right" style={{ width: "100px" }} data-bs-dismiss="modal">Cerrar</button>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        : <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        }
    </>
    <Serviciospopulares />
  </div>
  )
}

export default DetallePrimeraParte