import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Product.scss";
import Product from "./Product";
// import Product from "./Product";

function AllProducts() {
  const {
    setPage,
    page,
    getData,
    allData,
    filteredData,
    isFilter,
    sortedByMinToMax,
    sortedByMaxToMin,
  } = useContext(DataContext);

  const handleBack = () => {
    if (page != 1) {
      getData(page - 1);
      setPage((p) => p - 1);
    }
  };
  const handleForward = () => {
    getData(page + 1);
    setPage((p) => p + 1);
  };

  return (
    <div className="allproducts">
      <button type="button" onClick={sortedByMinToMax}>
        Min TO mAX
      </button>
      <button onClick={sortedByMaxToMin}>mAX TO Min</button>
      {isFilter
        ? filteredData?.map((items, index) => (
            <Product items={items} key={index} />
          ))
        : allData?.map((item, index) => <Product items={item} key={index} />)}

      {/* {allData?.map((item, index) => (
        <Product items={item} key={index} />
      ))} */}
      <button onClick={handleBack}>
        <FaChevronLeft />
      </button>
      <button onClick={handleForward}>
        <FaChevronRight />
      </button>
    </div>
  );
}

export default AllProducts;
