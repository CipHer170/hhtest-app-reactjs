import { useContext, useEffect } from "react";
import "./App.css";
import AllProducts from "./components/AllProducts";
import { DataContext } from "./context/DataContext";

function App() {
  const { getData } = useContext(DataContext);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AllProducts />
    </>
  );
}

export default App;
