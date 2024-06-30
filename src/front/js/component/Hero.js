import React from "react";
import "../../styles/hero.css";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const [input, setInput] = useState('')

  const { store, actions } = useContext(Context)

  useEffect(() => {
    actions.getCategorySearchBar()
  }, [input]);


  const onSearch = (searchItem) => {
    console.log(searchItem);
  }

  // let category = store.providersCategory.filter((category) => category)


  /*
    const handleChange = (value) => {
      setInput(value)
      fetchData(value)
    }
      */


  return (
    <>



      <div className="background-hero">
        <div className="container col-xxl-8 px-4 pb-5">
          <div className="row d-flex justify-content-center flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img src="https://res.cloudinary.com/dq3mxxidu/image/upload/v1718676109/hero_oebzkz.png" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy" />
            </div>
            <div className="col-lg-6 text-start">
              <p className="display-5 fw-bold hero-first lh-1 mb-3">Servicios Premium</p>
              <h1 className="lead hero-second">Brindamos Servicios</h1>
              <h2 className="lead hero-third ">Profesionales de Alta Calidad</h2>



              <form className="d-flex" role="search">
                <input list="browsers" name="browser" id="browser" className="search-style" onChange={(e) => { setInput(e.target.value) }}></input>
                <datalist id="browsers">
                  {store.providersCategory.length != 0 ? store.providersCategory.map((proveedor, index) => {
                    return proveedor.services.map((service, index) => {
                      console.log(service.category)
                      return <option value={service.category} />

                    })
                  }) : "loading"}
                </datalist>
                <button className="btn button-search px-5 ms-3" type="button" onClick={() => { onSearch(input) }}> Search</button>
              </form>


            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Hero