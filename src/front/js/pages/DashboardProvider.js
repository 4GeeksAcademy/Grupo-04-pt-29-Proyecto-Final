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
  const { id } = useParams()

    
  useEffect(() => {
    actions.getProfileProvider(id)
    actions.getProviderByUserID(id)
  },[])


  return (
    <div className="Dash-Provider dashboard-responsive justify-content-center py-5">
      <div className="Provider-card px-4 mb-5">
        <div className="profile justify-content-center">
          <div className="d-flex justify-content-center">
            <div
              className="card d-flex justify-content-center shadow "
              style={{ width: "20rem" }}
            >
              <div className="d-flex justify-content-center border-bottom pb-3">
               
                <img
                  src={store.provider.url_image}
                  alt=""
                  className="img-fluid pt-4 rounded " 
                  style={{
                   
                    width: "200px",
                    height: "200px",
                    backgroundSize: "cover"
                  }}
                />
             
              </div>

              <div className="card-body " >
                <div className="d-flex">
                  <h5 className="title-label-provider d-flex"><i class="fa-solid fa-user"></i>  <p className="p-provider ps-2">  {store.user.username} {store.provider.last_name}</p>
                  </h5>
                </div>
                <h5 className="title-label-provider d-flex"><i class="fa-solid fa-envelope"></i> <p className="p-provider ps-2"> {store.user.email}</p></h5>
                <h5 className="title-label-provider d-flex"><i class="fa-solid fa-phone"></i> <p className="p-provider ps-2">{store.provider.phone}  </p></h5>
                <h5 className="title-label-provider d-flex"><i class="fa-solid fa-location-dot"></i><p className="p-provider ps-2">{store.provider.location}  </p></h5>
                <h5 className="title-label-provider d-flex"><i class="fa-solid fa-briefcase"></i> <p className="p-provider ps-2">{store.provider.profession}  </p></h5>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Provider-Configurate mx-3">
        <>
        <div className="menu-provider-dashboard">
          <ul className="nav nav-tabs " id="myTab" role="tablist">
            
            <li className="nav-item" role="presentation">
              <button
                className="nav-link title-buttons-provider title-label-provider "
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
                className="nav-link title-buttons-provider title-label-provider"
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
                className="nav-link title-buttons-provider title-label-provider"
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
                className="nav-link title-buttons-provider title-label-provider"
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
              className="tab-pane fade  show active"
              id="add-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
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
          </div>
        </>
      </div>
    </div>
  );
};

export default DashboardProvider;
