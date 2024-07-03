import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

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
    <div className="AddServices container ">
      <form className="Forms container">
        <div className="form-group input-container">
          <label htmlFor="title">Titulo:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group input-container" >
          <label htmlFor="category">Categoria:</label>
          <select
            className="form-select"
            aria-label="Default select example"
          >
            <option selected=""></option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
          </select>
        </div>

        <div className="form-group input-container">
          <label htmlFor="address">Precio</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone"> Descripcion del Servicio :</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="">Portada del Servicio</label>
          <input
            type="text"
            className="form-control"
            id="img"
            name="img"
            value={url_image}
            onChange={(e) => setUrl_image(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 btn-save"
          onClick={handleSaveService}
        >
          Save
        </button>
      </form>
      <br />
    </div>
  );
};
export default AddN;
