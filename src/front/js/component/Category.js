import React from "react";
import "../../styles/categorySection.css";

const Category = () => {
    return (
      
        <div className="text-secondary px-4 py-5 text-center" style={{backgroundColor:"#FAFAFA"}}>
    <div className="py-5 col-lg-12 col-md-12 col-sm-12">
      <h1 className="display-5 title-category">Categoría</h1>
      <div className="d-flex justify-content-center py-3"><div class="line"></div></div>
      
      <div className="d-flex justify-content-center pb-1"> <p className=" p-text mb-4 d-flex justify-content-center">Ofrecemos soluciones para satisfacer las necesidades del cliente.</p> </div>
     
      <div className="col-lg-12 col-md-12 col-sm-12 container-categories">
   
        <div className=" gap-2 d-flex justify-content-center pb-5 ">
            <button className="size-category">   <div className=""><i class="fa-solid fa-spray-can-sparkles fs-3"> </i></div>
            <div className="pt-2 ">Limpieza</div></button>
            
            <button className="size-category">   <div className=""><i class="fa-solid fa-screwdriver-wrench fs-3"></i></div>
            <div className="pt-2 ">Plomero</div></button>
            
            <button className="size-category">   <div className=""><i class="fa-solid fa-leaf fs-3"></i></div>
            <div className="pt-2 ">Jardinería</div></button>

            <button className="size-category">   <div className=""><i class="fa-solid fa-person-digging fs-3"></i></div>
            <div className="pt-2 ">Albañilería</div></button>

            <button className="size-category">   <div className=""><i class="fa-solid fa-bolt fs-3"></i></div>
            <div className="pt-2 ">Servicio Eléctrico</div></button>

            <button className="size-category">   <div className=""><i class="fa-solid fa-helmet-safety fs-3"></i></div>
            <div className="pt-2 ">Carpintería</div></button>
            
        
        </div>
      </div>
    </div>
  </div>
 
    )
}

export default Category