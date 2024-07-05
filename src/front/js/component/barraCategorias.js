import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/barraCategorias.css";


export const BarraCategorias = ({ filters, onFilterChange }) => {
  const { store, actions } = useContext(Context);

  const [category, setCategory] = useState(filters.category);
  const [price, setPrice] = useState(filters.price);
  const [location, setLocation] = useState(filters.location);
  const [selectedCategories, setSelectedCategories] = useState(filters.selectedCategories);
  const [selectedPrices, setSelectedPrices] = useState(filters.selectedPrices);
  const [selectedLocations, setSelectedLocations] = useState(filters.selectedLocations);

  useEffect(() => {
    onFilterChange({ ...filters, category, selectedCategories, price, location, selectedLocations });
  }, [category, selectedCategories, price, location, selectedPrices, selectedLocations]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCheckboxChange = (category) => {
    const updatedSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedSelectedCategories);
  };

  const handleCheckboxChangePrice = (price) => {
    const updatedSelectedLocations = selectedPrices.includes(price)
      ? selectedPrices.filter(c => c !== price)
      : [...selectedPrices, price];
    setSelectedPrices(updatedSelectedLocations);
  };

  const handleCheckboxChangeLocations = (location) => {
    const updatedSelectedLocations = selectedLocations.includes(location)
      ? selectedLocations.filter(c => c !== location)
      : [...selectedLocations, location];
    setSelectedLocations(updatedSelectedLocations);
  };

  useEffect(() => {
    actions.getProviders()
  }, [])
  const categoryCounts = {};

  store.listProviders.forEach(item => {
    item.services.forEach(service => {
      const category = service.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });
  });
  const uniqueCategories = Object.entries(categoryCounts);

  const priceCounts = {};

  store.listProviders.forEach(item => {
    item.services.forEach(service => {
      const price = service.price;
      if (priceCounts[price]) {
        priceCounts[price]++;
      } else {
        priceCounts[price] = 1;
      }
    });
  });
  const uniquePrices = Object.entries(priceCounts);

  const locationCounts = {};

  store.listProviders.forEach(item => {
    
      const location = item.location;
      if (locationCounts[location]) {
        locationCounts[location]++;
      } else {
        locationCounts[location] = 1;
      }
  });
  const uniqueLocations = Object.entries(locationCounts);

 
 
  return (
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed tituloCategoria-bc" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Categoría
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
              <ul className="ul-barraCat">
                <li className="li-barraCat">
                  <input type="search" 
                        className="form-control buscarbarra" 
                        placeholder="Buscar..." 
                        value={category}
                        onChange={handleCategoryChange} />
                </li>
                { uniqueCategories && uniqueCategories.map(([category, count]) => {
                  return (
                    <li key={`${count}+ ${category}`} className="li-barraCat">
                      <button type="button" className="btn btn-link categoria-bc">
                        <label className="d-flex">
                          <input type="checkbox" className="categoria-checkbox-bc" value={category} checked={selectedCategories.includes(category)} onChange={() => handleCheckboxChange(category)} />
                          {category} 
                        </label>
                      </button>
                      <h6 className="disponibleCategoria-bc">{count}</h6>
                    </li>
                  )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed tituloCategoria-bc" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Rango de precios
            </button>
          </h2>
          <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
              <ul className="ul-barraCat">
                <li className="li-barraCat">
                  <input type="search" 
                        className="form-control buscarbarra" 
                        placeholder="Buscar..." 
                        value={price}
                        onChange={handlePriceChange} />
                </li>
                { uniquePrices && uniquePrices.map(([price, count]) => {
                  return (
                    <li key={`${count}+ ${price}`} className="li-barraCat">
                      <button type="button" className="btn btn-link categoria-bc">
                        <label className="d-flex">
                          <input type="checkbox" className="categoria-checkbox-bc" value={price} checked={selectedPrices.includes(price)} onChange={() => handleCheckboxChangePrice(price)} />
                          {price}
                        </label>
                      </button>
                      <h6 className="disponibleCategoria-bc">{count}</h6>
                    </li>
                  )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed tituloCategoria-bc" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Locación
            </button>
          </h2>
          <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
              <ul className="ul-barraCat">
                <li className="li-barraCat">
                  <input type="search" className="form-control buscarbarra" placeholder="Buscar..."  value={location}
                        onChange={handleLocationChange} />
                </li>
                { uniqueLocations && uniqueLocations.map(([location, count]) => {
                  return (
                    <li key={`${count}+ ${location}`} className="li-barraCat">
                      <button type="button" className="btn btn-link categoria-bc">
                        <label className="d-flex">
                          <input type="checkbox" 
                                className="categoria-checkbox-bc" 
                                value={location}
                                checked={selectedLocations.includes(location)} onChange={() => handleCheckboxChangeLocations(location)}
                                placeholder="Buscar ubicación"/>
                          {location}
                        </label>
                      </button>
                      <h6 className="disponibleCategoria-bc">{count}</h6>
                    </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}

