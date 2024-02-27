import { createContext, useEffect, useState } from "react";
import md5 from "md5";
import moment from "moment";

export const DataContext = createContext();
const URL = "http://api.valantis.store:40000/";
const PASSWORD = import.meta.env.VITE_PASSWORD;

function Provider({ children }) {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getToday = moment(new Date()).format("YYYYMMDD");
  const AUTH = md5(PASSWORD + "_" + getToday);
  const [brandNames, setBrandNames] = useState([]);
  const [prices, setPrices] = useState([]);

  // user choice states
  const [userBrand, setUserBrand] = useState([]);
  const [userFields, setUserFields] = useState([]);

  const [sortedData, setSorrtedData] = useState([]);

  // get whole data
  const getData = async (currentPage = 1) => {
    setLoading(true);
    setError(false);
    try {
      const resIds = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": AUTH,
        },
        body: JSON.stringify({
          action: "get_ids",
          params: { offset: currentPage, limit: 50 },
        }),
      });

      const data = await resIds?.json();

      const resItems = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": AUTH,
        },
        body: JSON.stringify({
          action: "get_items",
          params: { ids: data?.result },
        }),
      });
      const productsData = await resItems?.json();
      setAllData(productsData.result);
    } catch (err) {
      alert(err);
      setError(true);
    }
    setLoading(false);
  };

  // get  filtered data
  const getDataByField = async (value, setData) => {
    try {
      const resFields = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": AUTH,
        },
        body: JSON.stringify({
          action: "get_fields",
          params: { field: value },
        }),
      });
      const productsData = await resFields?.json();
      const filteredBrands = [
        ...new Set((productsData?.result ?? [])?.filter((i) => i)),
      ];
      setData(filteredBrands);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataByField("brand", setBrandNames);
    getDataByField("price", setPrices);
  }, []);

  const sortedByMinToMax = allData?.slice().sort((a, b) => a.price - b.price);
  const sortedByMaxToMin = allData?.slice().sort((a, b) => b.price - a.price);

  const value = {
    getData,
    allData,
    setAllData,
    AUTH,
    getToday,
    setPage,
    page,
    loading,
    setLoading,
    error,
    setError,
    sortedByMinToMax,
    sortedByMaxToMin,
    getDataByField,
    userBrand,
    setUserBrand,
    userFields,
    setUserFields,
    brandNames,
    prices,
    sortedData,
    setSorrtedData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default Provider;
