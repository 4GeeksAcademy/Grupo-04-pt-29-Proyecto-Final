import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/barraCategorias.css";

export const BarraCategorias = () => {

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed tituloCategoria-bc" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Categoría
          </button>
        </h2>
        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">
            <ul className="ul-barraCat">
              <li className="li-barraCat">
                <input type="search" className="form-control buscarbarra" placeholder="Buscar..."/>
              </li>
              <li className="li-barraCat">
                <button type="button" className="btn btn-link categoria-bc">
                <label className="d-flex">
                  <input type="checkbox" className="categoria-checkbox-bc"/>
                    Plomería
                </label>
                </button>
                <h6 className="disponibleCategoria-bc">15</h6>
              </li>
              <li className="li-barraCat">
                <button type="button" className="btn btn-link categoria-bc">
                <label className="d-flex">
                  <input type="checkbox" className="categoria-checkbox-bc"/>
                    Carpintería
                </label>
                </button>
                <h6 className="disponibleCategoria-bc">17</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed tituloCategoria-bc" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Rango de precios
          </button>
        </h2>
        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">
          <ul className="ul-barraCat">
              <li className="li-barraCat">
                <input type="search" className="form-control buscarbarra" placeholder="Buscar..."/>
              </li>
              <li className="li-barraCat">
                <button type="button" className="btn btn-link categoria-bc">
                <label className="d-flex">
                  <input type="checkbox" className="categoria-checkbox-bc"/>
                    5 - 10
                </label>
                </button>
                <h6 className="disponibleCategoria-bc">10</h6>
              </li>
              <li className="li-barraCat">
                <button type="button" className="btn btn-link categoria-bc">
                <label className="d-flex">
                  <input type="checkbox" className="categoria-checkbox-bc"/>
                    11 -20
                </label>
                </button>
                <h6 className="disponibleCategoria-bc">4</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed tituloCategoria-bc" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            Locación
          </button>
        </h2>
        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div className="accordion-body">
          <ul className="ul-barraCat">
              <li className="li-barraCat">
                <input type="search" className="form-control buscarbarra" placeholder="Buscar..."/>
              </li>
              <li className="li-barraCat">
                <button type="button" className="btn btn-link categoria-bc">
                <label className="d-flex">
                  <input type="checkbox" className="categoria-checkbox-bc"/>
                    Quito
                </label>
                </button>
                <h6 className="disponibleCategoria-bc">22</h6>
              </li>
              <li className="li-barraCat">
                <button type="button" className="btn btn-link categoria-bc">
                <label className="d-flex">
                  <input type="checkbox" className="categoria-checkbox-bc"/>
                    Cuenca
                </label>
                </button>
                <h6 className="disponibleCategoria-bc">10</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

