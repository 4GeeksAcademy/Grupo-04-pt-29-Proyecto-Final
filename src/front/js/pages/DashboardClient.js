import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import EditClient from "../component/editClient";
import MyProfileClient from "../component/myProfileClient";

const DashboardClient = () => {
  const { store, actions } = useContext(Context);
  const {id}=useParams()

  useEffect(()=>{
    actions.getClientByUserID(id)
  })


  return (
    <div className="Dash-Client d-flex justify-content-center">
      <div className="Client-card">
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
                <h5>
                  <p>Username {store.user.username}</p>
                </h5>
                <p>{store.client.name} {store.client.last_name} </p>
                <p>Email:{store.user.email}</p>
                <p>Telefono:{store.client.phone}</p>
                <p>Ubicacion:{store.client.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Client-Configurate">
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
                id="favorite-tab"
                data-bs-toggle="tab"
                data-bs-target="#favorite-tab-pane"
                type="button"
                role="tab"
                aria-controls="favorite-tab-pane"
                aria-selected="false"
              >
                Mis Favoritos
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
				      <EditClient/>
            </div>
            <div
              className="tab-pane fade"
              id="favorite-tab-pane"
              role="tabpanel"
              aria-labelledby="favorite-tab"
              tabIndex={0}
            >
              Mis Favoritos
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
export default DashboardClient;
