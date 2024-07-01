import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Hero from "../component/Hero";
import Category from "../component/Category"
import UneteSection from "../component/uneteSection"
import { SobreNosotros } from "../component/sobreNosotros";
import Suscribete from "../component/suscribete";
import Serviciospopulares from "../component/serviciosPopulares";




export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<div>
			<Hero/>
			<Category/>
			<UneteSection/>
			<SobreNosotros />
			<Serviciospopulares />
			<Suscribete />
		</div>
	);
	
};
