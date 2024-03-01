import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

function Sort() {
  const {
    getUserFilteredData,
    allBrandNames,
    setFilteredData,
    setIsFilter,
    clearFilter,
    setClearFilter,
    getData,
    userWord,
    setUserWord,
  } = useContext(DataContext);
  const [selectedOption, setSelectedOption] = useState();

  const handleUserBrand = (e, userChoice) => {
    setSelectedOption(e.target.value);
    if (e.target.checked) {
      const userChoices = { brand: userChoice };
      getUserFilteredData(userChoices);
      setClearFilter(true);
      setIsFilter(true);
    } else {
      setIsFilter(false);
    }
  };

  const handleClearFilter = () => {
    setClearFilter(false);
    getData();
    setClearFilter(true);
    setSelectedOption("");
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setUserWord(e.target.value);
    setFilteredData(userWord);
    console.log(userWord);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="sort">
        <input
          type="text"
          id="userWord"
          placeholder="Enter word"
          // value={userWord}
          onChange={(e) => handleChangeSearch(e)}
        />
        Filter by brand
        {/* brand name */}
        <div className="sort__brand">
          {clearFilter === true && (
            <button type="button" onClick={handleClearFilter}>
              clear filter
            </button>
          )}
          {allBrandNames.map((brand, indexBrand) => {
            return (
              <span key={indexBrand} className="choice">
                <input
                  type="radio"
                  id={brand}
                  name="scales"
                  value={brand}
                  onChange={(e) => handleUserBrand(e, brand)}
                  checked={selectedOption === brand}
                />
                <label htmlFor={brand}>{brand}</label>
              </span>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
}

export default Sort;

{
  /* price */
}
{
  /* <div className="sort__brand">
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
        </div> */
}

// const handleUserPrice = (e, userChoice) => {
//   if (e.target.checked) {
//     setIsFilter(true);
//     setClearFilter(false);
//     const userChoices = { price: userChoice };
//     getUserFilteredData(userChoices);
//     getUserFilteredData(userChoices);
//   } else {
//     setIsFilter(false);
//   }
// };
