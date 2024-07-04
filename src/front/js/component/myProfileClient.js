import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import AddClient from "../component/addClient.js"

const MyProfileClient = () => {

  return (
    <div className="ProfileClient container ">
      <AddClient />
    </div>
  );
};
export default MyProfileClient;
