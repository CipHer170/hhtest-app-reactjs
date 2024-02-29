import { useContext, useEffect } from "react";
import "./App.scss";
import AllProducts from "./components/AllProducts";
import { DataContext } from "./context/DataContext";
import Sort from "./components/Sort";
import Loading from "./components/Loading";

function App() {
  const { getData, setLoading, error, loading } = useContext(DataContext);

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
    <div className="App">
      <h2>Show just 50 items per page</h2>
      {error && <div>Error</div>}
      {loading && <Loading />}
      <div className="data">
        <Sort />
        <AllProducts />
      </div>
    </div>
  );
}

export default App;
