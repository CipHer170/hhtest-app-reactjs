import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Sort() {
  const { getUserFilteredData, allBrandNames } = useContext(DataContext);

  const handleUserBrand = (brand) => {
    getUserFilteredData(brand);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="sort">
        Filter by brand
        {/* brand name */}
        <div className="sort__brand">
          <input type="number" id="price" placeholder="Enter brand name" />

          {allBrandNames.map((brand, indexBrand) => {
            return (
              <span key={indexBrand} className="choice">
                {indexBrand + 1}
                <input
                  type="checkbox"
                  id={brand}
                  name="scales"
                  onClick={() => handleUserBrand(brand)}
                />
                <label htmlFor={brand}>{brand}</label>
              </span>
            );
          })}
        </div>
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
