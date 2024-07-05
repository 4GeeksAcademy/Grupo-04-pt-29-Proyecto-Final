import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const EditClient = () => {
  const { actions, store } = useContext(Context);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [url_image, setUrl_image] = useState("");
  const [bio, setBio] = useState("");

  const editClient = store.clients.find(client => client.id === parseInt(id));

  useEffect(() => {
    if (editClient) {
      setName(editClient.name);
      setLast_name(editClient.last_name);
      setPhone(editClient.phone);
      setLocation(editClient.location);
      setUrl_image(editClient.url_image);
      setBio(editClient.Bio);
    }
  }, [editClient]);

  const handleSubmit = (event) => {
    event.preventDefault();
    actions.editClient(id, name,last_name, phone, location, url_image, bio);
  };

 
  return (
    <div className="editClient container shadow">
      <form className="Forms container"onSubmit={handleSubmit}>
        <div className="form-group input-container">
          <label htmlFor="name" className="title-label-client">Nombre:</label>
          <input
            type="text"
            className="form-control border-label-client"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="name" className="title-label-client">Apellido:</label>
          <input
            type="text"
            className="form-control border-label-client"
            id="lastname"
            name="lastname"
            value={last_name}
            onChange={(event) => setLast_name(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone" className="title-label-client">Teléfono:</label>
          <input
            type="text"
            className="form-control border-label-client"
            id="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="adress" className="title-label-client">Ubicación:</label>
          <input
            type="adress"
            className="form-control border-label-client"
            id="adress"
            name="adress"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone" className="title-label-client"> Biografía:</label>
          <input
            type="text"
            className="form-control border-label-client"
            id="description"
            name="description"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="" className="title-label-client">Imagen de Portada</label>
          <input
            type="text"
            className="form-control border-label-client"
            id="img"
            name="img"
            value={url_image}
            onChange={(event) => setUrl_image(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="button-style-client title-label-client mt-4 btn-save">
          Guardar
        </button>
      </form>
      <br />
    </div>
  );
};
export default EditClient;