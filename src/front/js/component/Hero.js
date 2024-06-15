import React from "react";
import hero from "../../img/hero.png"
import "../../styles/hero.css";

const Hero = () => {
    return (
        <div style={{backgroundColor: "#F0F4FF"}}>
        <div className="container col-xxl-8 px-4 pb-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src={hero} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div className="col-lg-6 text-start">
        <p className="display-5 fw-bold hero-first lh-1 mb-3">Servicios Premium</p>
        <h1 className="lead hero-second">Brindamos Servicios</h1>
        <h2 className="lead hero-third ">Profesionales de Alta Calidad</h2>
        <form className="d-flex" role="search">
        <input className="form-control me-2 search-style" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn button-search px-5 ms-3" type="submit"> Search</button>
      </form>
      </div>
    </div>
  </div>
  </div>
    )
}

export default Hero