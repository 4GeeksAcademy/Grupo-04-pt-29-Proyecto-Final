import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/editprovider.css";

const AddNewAd = () => {

  const { actions } = useContext(Context);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [url_image, setUrl_image] = useState("");

  const handleSaveService = async () => {
    await actions.createService(title, category, price, description, url_image);
    actions.getServices();
  };
  return (
    <div className="pb-5">
    <div className="AddServices container shadow">
      <form className="Forms container">
        <div className="row py-3">
          <div className="form-group input-container col-lg-6 col-sm-12">
            <label htmlFor="title" className="title-label-provider">Titulo:</label>
            <input
              type="text"
              className="form-control border-label-provider"
              id="title"
              name="title "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group input-container col-lg-6 col-sm-12" >
            <label htmlFor="category" className="title-label-provider">Categoria:</label>
            <select
              className="form-select border-label-provider"
              aria-label="Default select example"
            >
              <option selected=""></option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </select>
          </div>
        </div>
        <div className="row pb-3">
          <div className="form-group input-container col-lg-6 col-sm-12">
            <label htmlFor="address" className="title-label-provider">Precio</label>
            <input
              type="text"
              className="form-control border-label-provider"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group input-container col-lg-6 col-sm-12">
            <label htmlFor="phone" className="title-label-provider"> Descripcion del Servicio :</label>
            <input
              type="text"
              className="form-control border-label-provider"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group input-container">
          <label htmlFor="" className="title-label-provider">Portada del Servicio</label>
          <input
            type="text"
            className="form-control border-label-provider"
            id="img"
            name="img"
            value={url_image}
            onChange={(e) => setUrl_image(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="button-style-provider title-label-provider mt-4 btn-save"
          onClick={handleSaveService}
        >
          Guardar
        </button>
      </form>
      <br />
    </div>
    </div>
  );
};
export default AddNewAd;
