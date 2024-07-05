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
    <div className="editClient container ">
      <form className="Forms container"onSubmit={handleSubmit}>
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
          <label htmlFor="name">Apellido:</label>
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
          <label htmlFor="phone">Phone:</label>
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
          <label htmlFor="adress">Ubicacion:</label>
          <input
            type="adress"
            className="form-control"
            id="adress"
            name="adress"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        <div className="form-group input-container">
          <label htmlFor="phone"> Biografia:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
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
            onChange={(event) => setUrl_image(event.target.value)}
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