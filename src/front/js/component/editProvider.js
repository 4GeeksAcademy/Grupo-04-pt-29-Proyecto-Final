import React from "react";

const EditProvider= () => {
  
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
          <label htmlFor="phone"> Telefono :</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone">Empresa (opcional):</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Numero de Registro de la Empresa (opcional):</label>
          <input
            type="text"
            className="form-control"
            id="companyIdentity"
            name="companyIdentity"
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Location:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Servicio:</label>
          <input
            type="text"
            className="form-control"
            id="services"
            name="services"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Documento de Identidad</label>
          <input
            type="text"
            className="form-control"
            id="identity"
            name="identity"
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="address">Experiencia Laboral</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            name="experience"
            required
          />
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
export default EditProvider;