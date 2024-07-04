import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import MyProfileProvider from "../component/myProfileProvider";
import EditProvider from "../component/editProvider";
import AddNewAd from "../component/addNewAd";
import MyAds from "../component/myAds";
import AddProvider from "../component/addProvider"


const DashboardProvider = () => {
  const { store, actions } = useContext(Context);
  const {id}=useParams()

  useEffect(()=>{
     actions.getProfileProvider(id)
  })

  return (
    <div className="Dash-Provider d-flex justify-content-center">
      <div className="Provider-card">
        <div className="profile justify-content-center">
          <div className="d-flex justify-content-center">
            <div
              className="card d-flex justify-content-center"
              style={{ width: "20rem" }}
            >
              <div className="d-flex justify-content-center">
                <img
                  src={rigoImage}
                  alt=""
                  className="img-fluid pt-4"
                  style={{
                    borderRadius: "50%",
                    width: "200px",
                  }}
                />
              </div>

              <div className="card-body">
                <h5>Usuario:  {store.user.username}
                </h5>
                <p>Correo: {store.user.email}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Provider-Configurate">
        <>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Mi Perfil
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="add-tab"
                data-bs-toggle="tab"
                data-bs-target="#add-tab-pane"
                type="button"
                role="tab"
                aria-controls="add-tab-pane"
                aria-selected="false"
              >
                Agregar Datos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="edit-tab"
                data-bs-toggle="tab"
                data-bs-target="#edit-tab-pane"
                type="button"
                role="tab"
                aria-controls="edit-tab-pane"
                aria-selected="false"
              >
                Editar Datos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="myAds-tab"
                data-bs-toggle="tab"
                data-bs-target="#myAds-tab-pane"
                type="button"
                role="tab"
                aria-controls="myAds-tab-pane"
                aria-selected="false"
              >
                Mis Servicios
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="myNewAds-tab"
                data-bs-toggle="tab"
                data-bs-target="#myNewAds-tab-pane"
                type="button"
                role="tab"
                aria-controls="myNewAds-tab-pane"
                aria-selected="false"
              >
                Nuevo Servicio
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex={0}
            >
              <MyProfileProvider />
            </div>
            <div
              className="tab-pane fade"
              id="add-tab-pane"
              role="tabpanel"
              aria-labelledby="add-tab"
              tabIndex={0}
            >
              <AddProvider />
            </div>
            <div
              className="tab-pane fade"
              id="edit-tab-pane"
              role="tabpanel"
              aria-labelledby="edit-tab"
              tabIndex={0}
            >
              <EditProvider />
            </div>
            <div
              className="tab-pane fade"
              id="myAds-tab-pane"
              role="tabpanel"
              aria-labelledby="myAds-tab"
              tabIndex={0}
            >
              <MyAds />
            </div>
            <div
              className="tab-pane fade"
              id="myNewAds-tab-pane"
              role="tabpanel"
              aria-labelledby="myNewAds-tab"
              tabIndex={0}
            >
              <AddNewAd />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default DashboardProvider;
