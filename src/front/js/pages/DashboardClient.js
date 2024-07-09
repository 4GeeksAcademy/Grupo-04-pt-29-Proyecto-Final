import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import EditClient from "../component/editClient";
import MyProfileClient from "../component/myProfileClient";
import "../../styles/dashboardclient.css";

const DashboardClient = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams()

  useEffect(() => {
    actions.getClientByUserID(id)
  }, []);


  return (
    <div className="Dash-Client  justify-content-center dashboard-responsive-client py-5">
      <div className="Client-card px-4 mb-5">
        <div className="profile justify-content-center">
          <div className="d-flex justify-content-center">
            <div
              className="card d-flex justify-content-center shadow"
              style={{ width: "20rem" }}
            >
              {/* <div className="d-flex justify-content-center border-bottom pb-3">
                <img
                  src={store.client.url_image}
                  alt=""
                  className="img-fluid pt-4 rounded"
                  style={{
                    
                    width: "200px",
                    height: "200px",
                    backgroundSize: "cover"
                  }}
                />
              </div> */}

              <div className="card-body">
                <div className="">
                  <h5 className="title-label-client d-flex"><i class="fa-solid fa-user"></i> <p className="p-client ps-2">  {store.client.name} {store.client.last_name}</p></h5>
                  <h5 className="title-label-client d-flex"><i class="fa-solid fa-envelope"></i> <p className="p-client ps-2">{store.user.email}</p></h5>
                  <h5 className="title-label-client d-flex"><i class="fa-solid fa-phone"></i>  <p className="p-client ps-2">{store.client.phone}</p></h5>
                  <h5 className="title-label-client d-flex"><i class="fa-solid fa-location-dot"></i> <p className="p-client ps-2">{store.client.location}</p></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Client-Configurate mx-3">
        <>
          <ul className="nav nav-tabs menu-items-width-client" id="myTab" role="tablist" >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active title-buttons-client title-label-client"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Agregar Mis Datos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link title-buttons-client title-label-client"
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
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex={0}
            >
              <MyProfileClient />
            </div>
            <div
              className="tab-pane fade"
              id="edit-tab-pane"
              role="tabpanel"
              aria-labelledby="edit-tab"
              tabIndex={0}
            >
              <EditClient />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
export default DashboardClient;
