import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

function Sort() {
  const { allBrandNames } = useContext(DataContext);
  const [indexBrand, setIndexBrand] = useState(10);

  const handleShowMoreBrand = () => {
    setIndexBrand((prevIndexBrand) => prevIndexBrand + 1);
    console.log(indexBrand, "indexbrand");
  };

  const handleUserBrand = (e) => {
    console.log(e.target.id);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="sort">
        Filters
        {/* brand name */}
        <div className="sort__brand">
          <button onClick={handleShowMoreBrand}>Show More {indexBrand}</button>
          <legend>Brand Name</legend>
          {allBrandNames.map((brand, indexBrand) => {
            return (
              <span key={indexBrand} className="choice">
                {indexBrand}
                <input
                  type="checkbox"
                  id={brand}
                  name="scales"
                  onClick={() => handleUserBrand}
                />
                <label htmlFor={brand}>{brand}</label>
              </span>
            );
          })}
          <input type="number" id="price" placeholder="Enter price" />
        </div>
      </div>
    </div>
  );
}

export default Sort;

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
