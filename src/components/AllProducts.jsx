import Product from "./Product";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
function AllProducts() {
  const { allData, setPage, page, getData } = useContext(DataContext);

  return (
    <div>
      <h1>Show just 50 ({page}) items per page</h1>
      <button
        onClick={() => {
          getData(page + 1);
          setPage((p) => p + 1);
        }}
      >
        increment
      </button>
      {allData?.map((item, index) => (
        <Product items={item} key={index} />
      ))}
    </div>
  );
}

export default AllProducts;
