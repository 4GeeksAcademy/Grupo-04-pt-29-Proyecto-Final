import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Suscribete from "../component/suscribete";
import Hero from "../component/Hero";



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<Hero/>
			<Suscribete />
		</div>
	);
};
