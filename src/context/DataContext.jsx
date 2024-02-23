import { createContext, useState } from "react";
import md5 from "md5";
import moment from "moment";

export const DataContext = createContext();

const PASSWORD = "Valantis";
const URL = "http://api.valantis.store:40000/";

function Provider({ children }) {
  const getToday = moment(new Date()).format("YYYYMMDD");
  const AUTH = md5(PASSWORD + "_" + getToday);

  const [page, setPage] = useState(1);

  const [allData, SetAllData] = useState();

  const getData = async (currentPage = 1) => {
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

      const data = await resIds.json();

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
      const productsData = await resItems.json();
      SetAllData(productsData.result);
    } catch (error) {
      console.log(error);
    }
  };

  const value = { getData, allData, SetAllData, AUTH, getToday, setPage, page };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default Provider;
