import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import EditClient from "../component/editClient";

const DashboardClient = () => {
  const { store } = useContext(Context);
  console.log(store.user);

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
                <p>Email:{store.user.email}</p>
                <p>Location{store.user.location}</p>
                <p>Valoration{store.user.location}</p>
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
                Edit Profile
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Favoritos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="disabled-tab"
                data-bs-toggle="tab"
                data-bs-target="#disabled-tab-pane"
                type="button"
                role="tab"
                aria-controls="disabled-tab-pane"
                aria-selected="false"
                disabled=""
              >
                Cerrar Seccion
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
				<EditClient/>
            </div>
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex={0}
            >
              Mis Anuncios
            </div>
            <div
              className="tab-pane fade"
              id="disabled-tab-pane"
              role="tabpanel"
              aria-labelledby="disabled-tab"
              tabIndex={0}
            >
              Cerrar seccion
            </div>
          </div>
        </>
      </div>
    </div>
  );
};
export default DashboardClient;
