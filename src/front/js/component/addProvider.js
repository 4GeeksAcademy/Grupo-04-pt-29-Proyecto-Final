import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/editprovider.css";
const AddProvider = () => {


    const { actions } = useContext(Context);
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


    const handleSaveProvider = async () => {
        await actions.createProvider(name, last_name, identity_number, company, number_company, phone, location, profession, experience, description, url_image);
        actions.getProviders();
    };
    return (

        <div className="pb-5">
            <div className="editProvider container shadow">
                <form className="Forms container " >
                    <div className="row py-3">
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="name" className="title-label-provider">Nombre:</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="lastname" className="title-label-provider">Apellido:</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="lastname"
                                name="lastname"
                                value={last_name}
                                onChange={(event) => setLast_name(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="identity_number" className="title-label-provider">Numero de Identidad:</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="identity_number"
                                name="identity_number"
                                value={identity_number}
                                onChange={(event) => setIdentity_number(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="company" className="title-label-provider">Empresa</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="company"
                                name="company"
                                value={company}
                                onChange={(event) => setCompany(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="number_company" className="title-label-provider">Identificacion de la Empresa</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="number_company"
                                name="number_company"
                                value={number_company}
                                onChange={(event) => setNumber_company(event.target.value)}
                            />
                        </div>
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="phone" className="title-label-provider"> Telefono :</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="address" className="title-label-provider">Ubicacion:</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="address"
                                name="address"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="profession" className="title-label-provider">profession o Oficio</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="profession"
                                name="profession"
                                value={profession}
                                onChange={(event) => setProfession(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="experience" className="title-label-provider">Experiencia Laboral</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="experience"
                                name="experience"
                                value={experience}
                                onChange={(event) => setExperience(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group input-container col-lg-6 col-sm-12">
                            <label htmlFor="address" className="title-label-provider">Descripcion Profesional</label>
                            <input
                                type="text"
                                className="form-control border-label-provider"
                                id="description"
                                name="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group input-container">
                        <label htmlFor="" className="title-label-provider">Imagen de Portada</label>
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
                    <button type="submit" className="button-style-provider title-label-provider mt-4 btn-save"  onClick={handleSaveProvider}>
                        Guardar
                    </button>
                </form>
                <br />
            </div>

        </div>
    );
};
export default AddProvider;
