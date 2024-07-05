import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const MyProfileProvider = () => {
  const { store, actions } = useContext(Context);
  const {id}=useParams()

  useEffect(()=>{
    actions.getProviderByUserID(id)
  },[])

  return (
    <div className="ProfileProvider container ">
      <h1>Mi Perfil</h1>
      <p>{store.provider.name}</p>
      <p>{store.provider.last_name}</p>
      <p>{store.provider.identity_number}</p>
      <p>{store.provider.company}</p>
      <p>{store.provider.number_company}</p>
      <p>{store.provider.phone}</p>
      <p>{store.provider.location}</p>
      <p>{store.provider.profession}</p>
      <p>{store.provider.experience}</p>
      <p>{store.provider.description}</p>
      <p>{store.provider.url_image}</p>
    </div>
  );
};
export default MyProfileProvider;
