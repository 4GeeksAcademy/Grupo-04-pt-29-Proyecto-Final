import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const EditProvider = () => {

  const { actions, store } = useContext(Context);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [identity_number, setIdentity_number] = useState("");
  const [company, setCompany] = useState("");
  const [number_company, setNumber_company] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [experience, setExperience] = useState("");
  const [url_image, setUrl_image] = useState("");
  const [description, setDescription] = useState("");

  const editProvider = store.Provider.find(provider => provider.id === parseInt(id));

  useEffect(() => {
    if (editProvider) {
      setName(editProvider.name);
      setLast_name(editProvider.last_name);
      setIdentity_number(editProvider.identity_number);
      setCompany(editProvider.company);
      setNumber_company(editProvider.number_company);
      setPhone(editProvider.phone);
      setLocation(editProvider.location);
      setProfession(editProvider.profession);
      setExperience(editProvider.experience);
      setUrl_image(editProvider.url_image);
      setDescription(editProvider.description);
    }
  }, [editProvider]);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.editProvider(id, name,last_name,identity_number,company,number_company,phone,location,profession,experience, description, url_image);
  };


  return (
    <div className="editProvider container " onSubmit={handleSubmit}>
      <form className="Forms container" >
        <div className="form-group input-container">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="lastname">Apellido:</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            value={last_name}
            onChange={(event) => setLast_name(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="identity_number">Numero de Identidad:</label>
          <input
            type="text"
            className="form-control"
            id="identity_number"
            name="identity_number"
            value={identity_number}
            onChange={(event) => setIdentity_number(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="company">Empresa</label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="number_company">Identificacion de la Empresa</label>
          <input
            type="text"
            className="form-control"
            id="number_company"
            name="number_company"
            value={number_company}
            onChange={(event) => setNumber_company(event.target.value)}
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone"> Telefono :</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
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
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="profession">profession o Oficio</label>
          <input
            type="text"
            className="form-control"
            id="profession"
            name="profession"
            value={profession}
            onChange={(event) => setProfession(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="experience">Experiencia Laboral</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            name="experience"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="">Imagen de Portada</label>
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
        <button type="submit" className="btn btn-primary mt-4 btn-save">
          Save
        </button>
      </form>
      <br />
    </div>
  );
};
export default EditProvider;