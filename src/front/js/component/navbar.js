import React, { useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/nabvar.css";
import { isLoggedIn } from "../utils/isLoggedIn";
// import { HashLink as Link} from "react-router-hash-link";


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handlerOut = () => {
    localStorage.removeItem("token");
    actions.logout();
    navigate("/");
  };
  const handleProfile = () => {
    if (store.user?.role === "Client") {
      navigate("/client");
    } else if (store.user?.role === "Provider") {
      navigate("/provider");
    } else {
      // Handle the case where the user role is not found or invalid
      console.warn("Invalid user role:", store.user?.role);
    };
  };
  console.log(store.user)
  
  const handleHome = () => {
    navigate("/productspage");
  };
  
  return (
    <div className="bg-white">
      <div className="Navbar">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2">
          <div className="col-md-3 mb-2 mb-md-0">
            <a
              href="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <img
                className="mt-3"
                src="https://res.cloudinary.com/dq3mxxidu/image/upload/v1719006034/logo_ecy7em.jpg"
                style={{ height: "51px", width: "250px" }}
              />
            </a>
          </div>

          {!isLoggedIn() ? (
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 menu">
              <li>
                  <a  href="#nosotros" className="px-3">
                  Sobre Nosotros
                  </a>
              </li>
              <li>
                <a href="/signup" className=" px-3">
                  Regístrate
                </a>
              </li>
              <li>
                <a href="/login" className=" px-3">
                  Iniciar Sesión
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}

          {isLoggedIn() ? (
            <div className="col-md-2  d-flex text-end ">
              <button className="btn" style={{ fontSize: "22px" }}
              onClick={handleHome}>
                {" "}
                <>home</>
              </button>

              <button className="btn" style={{ fontSize: "22px" }}>
                {" "}
                <i className="px-3 fa-regular fa-heart"></i>
              </button>
			        <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
				          style={{ fontSize: "22px" }}
                >
                  <i className="fa-solid fa-user"></i>
                </button>
                <ul
                  class="dropdown-menu"
                  style={{ backgroundColor: "transparent" }}
                >
                   <li className="p-1" onClick={handleProfile}>
                    <button className="btn btn-outline-primary"> profile </button>
                  </li>
                  <li className="p-1" onClick={handlerOut}>
                    <button className="btn btn-outline-primary"> log out </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </header>
      </div>
    </div>
  );
};
