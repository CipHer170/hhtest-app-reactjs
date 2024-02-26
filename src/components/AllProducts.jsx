import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Product.scss";
import Loading from "./Loading";
// import Product from "./Product";

function AllProducts() {
  const { setPage, page, getData, error, loading } = useContext(DataContext);

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
      <h1>Show just 50 ({page}) items per page</h1>

      {error && <div>Error</div>}
      {loading && <Loading />}
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
