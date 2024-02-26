import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Sort() {
  const { allData } = useContext(DataContext);
  const uniqueBrandNames = Array.from(
    new Set(allData?.map((item) => item.brand))
  );
  console.log(uniqueBrandNames);
  return (
    <div className="sort">
      Filters
      <fieldset>
        {/* brand name */}
        <legend>Brand Name</legend>

        {uniqueBrandNames.map((brand) => {
          if (brand === null) return null;
          return (
            <>
              <input type="checkbox" id={brand} name="scales" />
              <label htmlFor={brand}>{brand}</label>
            </>
          );
        })}
      </fieldset>
    </div>
  );
}

export default Sort;

//   {/* price */}
//   <legend>Price </legend>

//   <div>
//     <input type="range" id="volume" name="volume" min="0" max="11" />
//     <label htmlFor="volume"></label>
//   </div>
