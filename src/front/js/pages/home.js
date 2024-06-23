import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Suscribete from "../component/suscribete";
import Hero from "../component/Hero";
import {SobreNosotros} from "../component/sobreNosotros"



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<Hero/>
			<Suscribete />
		</div>
	);
};
