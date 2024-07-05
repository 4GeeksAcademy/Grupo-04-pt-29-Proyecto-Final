import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const AddClient = () => {

    const { actions, } = useContext(Context);
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [url_image, setUrl_image] = useState("");
    const [bio, setBio] = useState("");

    const handleSaveClient = async () => {
        await actions.createClient(name, last_name, phone, location, bio, url_image);
        actions.getClients();
    };
    useEffect(() => {

    }, []);
    return (
        <div className="addClient container ">
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
                        onChange={(e) => setBio(e.target.value)}
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
                <button
                    type="button"
                    className="btn btn-primary mt-4 btn-save"
                    onClick={handleSaveClient}>
                    Save
                </button>
            </form>
            <br />
        </div>
    );
};
export default AddClient;
