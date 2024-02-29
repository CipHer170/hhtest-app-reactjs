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
  const [allBrandNames, setAllBrandNames] = useState([]);
  const [allPrices, setAllPrices] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  // const [userChoice, setUserChoice] = useState([]);

  // get whole data
  const getToday = moment(new Date()).format("YYYYMMDD");
  const AUTH = md5(PASSWORD + "_" + getToday);
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

  // get sorted brand from list of brands
  const getDataByField = async (fieldName, setData) => {
    try {
      const resFields = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": AUTH,
        },
        body: JSON.stringify({
          action: "get_fields",
          params: { field: fieldName },
        }),
      });
      const productsData = await resFields?.json();
      const filteredFields = [
        ...new Set((productsData?.result ?? [])?.filter((i) => i)),
      ];
      setData(filteredFields);
    } catch (err) {
      console.log(err);
    }
  };

  //get filtered data accordint to user choice

  const getUserFilteredData = async (userChoice) => {
    try {
      const resFilter = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": AUTH,
        },
        body: JSON.stringify({
          action: "filter",
          params: userChoice,
        }),
      });
      const filtered = await resFilter?.json(); // возращает id

      const filteredIds = filtered?.result;

      // чтобы получить все элементы по фильтру которого мы получаем от клиента, нужно отправть еще один запрос в API с данными по filtered, и получить все ответы от API с id(filtered)

      if (filteredIds) {
        const resItems = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth": AUTH,
          },
          body: JSON.stringify({
            action: "get_items",
            params: { ids: filtered?.result },
          }),
        });
        const itemsData = await resItems?.json();
        setFilteredData(itemsData?.result || []);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    // this two cares fieldName, setData
    getDataByField("brand", setAllBrandNames);
    getDataByField("price", setAllPrices);

    //
  }, []);

  const sortedByMinToMax = () => {
    const data = isFilter
      ? filteredData?.slice().sort((a, b) => a.price - b.price)
      : allData?.slice().sort((a, b) => a.price - b.price);

    isFilter ? setFilteredData(data) : setAllData(data);
  };

  const sortedByMaxToMin = () => {
    const data = isFilter
      ? filteredData?.slice().sort((a, b) => b.price - a.price)
      : allData?.slice().sort((a, b) => b.price - a.price);
    isFilter ? setFilteredData(data) : setAllData(data);
  };

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
    getDataByField,
    allBrandNames,
    allPrices,
    getUserFilteredData,
    filteredData,
    setFilteredData,
    isFilter,
    setIsFilter,
    sortedByMaxToMin,
    sortedByMinToMax,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default Provider;
