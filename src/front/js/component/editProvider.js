import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const EditProvider = () => {

  const { actions, store } = useContext(Context);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [url_image, setUrl_image] = useState("");
  const [description, setDescription] = useState("");

  const providerEdit = store.Provider.find(provider => provider.id === parseInt(id));

  useEffect(() => {
    if (providerEdit) {
      setName(providerEdit.name);
      setLast_name(providerEdit.last_name);
      setPhone(providerEdit.phone);
      setLocation(providerEdit.location);
      setUrl_image(providerEdit.url_image);
      setDescription(providerEdit.description);
    }
  }, [providerEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.editClient(id, name, last_name, phone, location, url_image, description);
  };


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