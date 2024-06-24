import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { ProductsPage } from "./pages/productsPage";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Signup } from "./pages/signup";
import Login from "./pages/login";
import PrivateRoutes from "./utils/PrivateRoutes";
import DashboardClient from "./pages/DashboardClient";
import DashboardProvider from "./pages/DashboardProvider";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;
  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<DashboardClient />} path="/client" />
            <Route element={<DashboardProvider />} path="/provider" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<ProductsPage />} path="/productspage" />

            <Route element={<PrivateRoutes/>}>
              {/* Aqui van todas las rutas que quiero Proteger *(las Rutas Privadas) */}

            </Route>
            <Route element={<Login />} path="/login" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
