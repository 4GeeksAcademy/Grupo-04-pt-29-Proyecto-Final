import React from "react";

const EditClient= () => {
  
  return (
    <div className="EditUser container ">
      <form className="Forms container" >
        <div className="form-group input-container">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="name">Apellido:</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Ubicacion:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
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
export default EditClient;