import React from "react";

const AddNewAd = () => {
  return (
    <div className="EditUser container ">
      <form className="Forms container">
        <div className="form-group input-container">
          <label htmlFor="name">Titulo:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="form-group input-container" >
          <label htmlFor="name">Categoria:</label>
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
          <label htmlFor="address">Tarifa por hora</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone"> Numero Telefonico :</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Descripcion Profesional</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4 btn-save">
          Save
        </button>
      </form>
      <br />
    </div>
  );
};
export default AddNewAd;
