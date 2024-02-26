import { useContext, useEffect } from "react";
import "./App.scss";
import AllProducts from "./components/AllProducts";
import { DataContext } from "./context/DataContext";
import Sort from "./components/Sort";

function App() {
  const { getData, setLoading } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Sort />
      <AllProducts />
    </>
  );
}

export default App;
