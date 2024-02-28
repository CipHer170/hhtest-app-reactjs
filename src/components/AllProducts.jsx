import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Product.scss";
import Loading from "./Loading";
import Product from "./Product";
// import Product from "./Product";

function AllProducts() {
  const {
    setPage,
    page,
    getData,
    error,
    loading,
    allData,
    filteredData,
    isFilter,
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

  {
    isFilter;
  }

  return (
    <div className="allproducts">
      <h2>Show just 50 ({page}) items per page</h2>
      {error && <div>Error</div>}
      {loading && <Loading />}

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

{
  /* {!isFilter
        ? allData?.map((item, index) => <Product items={item} key={index} />)
        : filteredData?.map((item, index) => (
            <Product items={item} key={index} />
          ))} */
}
