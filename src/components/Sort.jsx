import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

function Sort() {
  const { getUserFilteredData, allBrandNames, setIsFilter, allPrices } =
    useContext(DataContext);
  const [clearFilter, setClearFilter] = useState(false);

  const handleUserBrand = (e, userChoice) => {
    if (e.target.checked) {
      const userChoices = { brand: userChoice };
      getUserFilteredData(userChoices);
      setClearFilter(false);
      setIsFilter(true);
    } else {
      setIsFilter(false);
    }
  };

  const handleUserPrice = (e, userChoice) => {
    if (e.target.checked) {
      setIsFilter(true);
      setClearFilter(false);
      const userChoices = { price: userChoice };
      getUserFilteredData(userChoices);
      getUserFilteredData(userChoices);
    } else {
      setIsFilter(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <button type="button" onClick={() => setClearFilter(true)}>
        clear filter
      </button>
      <div className="sort">
        Filter by brand
        {/* brand name */}
        <div className="sort__brand">
          <input type="number" id="brand" placeholder="Enter brand name" />

          {allBrandNames.map((brand, indexBrand) => {
            return (
              <span key={indexBrand} className="choice">
                {indexBrand + 1}
                <input
                  type="radio"
                  id={brand}
                  name="scales"
                  onClick={(e) => handleUserBrand(e, brand)}
                />
                <label htmlFor={brand}>{brand}</label>
              </span>
            );
          })}
        </div>
        {/* price */}
        {/* <div className="sort__brand">
          <input type="number" id="price" placeholder="Enter brand name" />

          {allPrices.map((price, indexPrice) => {
            return (
              <span key={indexPrice} className="choice">
                {indexPrice + 1}
                <input
                  type="checkbox"
                  id={price}
                  onClick={(e) => handleUserPrice(e, price)}
                />
                <label htmlFor={price}>{price}</label>
              </span>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}

export default Sort;

// const [indexBrand, setIndexBrand] = useState(10);
// const handleShowMoreBrand = () => {
//   setIndexBrand((prevIndexBrand) => prevIndexBrand + 1);
//   console.log(indexBrand, "indexbrand");
// };

// <div className="sort__price">
// Filters
// {/* brand name */}
// <legend>Prices Name</legend>
// <span className="choice">
//   <input type="number" id="min_price" name="scales" />
//   <label htmlFor="min_price">Min price</label>
// </span>
// <span className="choice">
//   <input type="number" id="max_price" name="scales" />
//   <label htmlFor="max_price">max price</label>
// </span>
// </div>
