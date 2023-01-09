import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Table from "../../components/table/table.component";
import { getService } from "../../services/getService";
import { basePoint } from "../../utils";
import classes from "./quotePage.module.css";

const QuotePage = () => {
  const history = useHistory();
  var fetchURL = history.location.search && history.location.search.split("=");
  const id = fetchURL[fetchURL.length - 1];
  const [quotesData, setQuotesData] = useState({});
  const [loader, setLoader] = useState(true);

  const [quotes, setQuotes] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [sortIcon, setSortIcon] = useState({ asc: false, dsc: false });
  let positiveSetTime;
  let negativeSetTime;
  // const [trigger, setTrigger] = useState(false);
  /**
   *
   * @param {*} sortType
   *
   * Function to sort data of Quote Table W.R.T Time
   */
  const handleSorting = (sortType) => {
    if (sortType === "asc") {
      if (!sortIcon.asc) {
        setQuotes(
          quotes.sort(function (a, b) {
            return new Date(b.time) - new Date(a.time);
          })
        );
        setSortIcon({ asc: true, dsc: false });
      } else {
        setQuotes([...quotesData.payload[id]]);
        setSortIcon({ asc: false, dsc: false });
      }
    } else {
      if (!sortIcon.dsc) {
        setQuotes(
          quotes.sort(function (a, b) {
            return new Date(a.time) - new Date(b.time);
          })
        );
        setSortIcon({ asc: false, dsc: true });
      } else {
        setQuotes([...quotesData.payload[id]]);
        setSortIcon({ asc: false, dsc: false });
      }
    }
  };

  /**
   *
   * @param {*} itm
   * Function for refreshing the page if the valid_till exceeds the current time
   *
   */

  const checkForvalidTime = (itm) => {
    let minTime = new Date(itm[0].valid_till).getTime() + 5.5 * 60 * 60 * 1000;
    for (let obj of itm) {
      if (new Date(obj.valid_till).getTime() + 5.5 * 60 * 60 * 1000 < minTime) {
        minTime = new Date(obj.valid_till).getTime() + 5.5 * 60 * 60 * 1000;
      }
    }

    if (minTime - Date.now() <= 0) {
      if (negativeSetTime) {
        clearTimeout(negativeSetTime);
      }
      negativeSetTime = setTimeout(() => {
        getQuotesData();
      }, 2000);
    } else {
      setQuotes(itm);
      setHeaderData(Object.keys(itm[0]));
      setLoader(false);
      positiveSetTime = setTimeout(() => {
        getQuotesData();
      }, minTime - Date.now());
    }
  };

  // const checkForvalidTime = (itm) => {
  //   let minTime = new Date(itm[0].valid_till).getTime() + 5.5 * 60 * 60 * 1000;
  //   let count = 0;
  //   for (let obj of itm) {
  //     if (
  //       new Date(obj.valid_till).getTime() + 5.5 * 60 * 60 * 1000 <
  //       Date.now()
  //     ) {
  //       getQuotesData();
  //       return false;
  //     } else {
  //       count = count + 1;
  //       if (
  //         new Date(obj.valid_till).getTime() + 5.5 * 60 * 60 * 1000 <
  //         minTime
  //       ) {
  //         minTime = new Date(obj.valid_till).getTime() + 5.5 * 60 * 60 * 1000;
  //       }
  //     }
  //   }
  //   if (count === itm.length) {
  //     setQuotes(itm);
  //     setHeaderData(Object.keys(itm[0]));
  //     setTimeout(() => {
  //       getQuotesData();
  //     }, minTime - Date.now());
  //   }
  // };

  const getQuotesData = async () => {
    try {
      setLoader(true);
      const response = await getService(`${basePoint}/quotes/${id}`);
      if (response) {
        var value = response.data;
        setQuotesData(value);
        if (value.success === true) {
          checkForvalidTime(value.payload[id]);
        } else {
          setLoader(false);
          setQuotes([]);
          setHeaderData([]);
        }
      }
    } catch (e) {
      setLoader(false);
      setQuotes([]);
      setHeaderData([]);
      console.log(e, "Something went Wrong");
    }
  };

  useEffect(() => {
    getQuotesData();
  }, []);

  if (loader)
    return (
      <div className={classes.loader}>
        <CircularProgress />{" "}
      </div>
    );

  return (
    <article className={classes.container}>
      <div className={classes.headerContainer}>
        <Link to={"/instruments"} className={classes.backBtn}>
          {" "}
          BACK{" "}
        </Link>
        <div className={classes.pageName}>QUOTES TABLE FOR {id}</div>
      </div>
      <div className={classes.tableWrapper}>
        <Table
          tableHeader={headerData}
          tableData={quotes}
          tableType={"quotes"}
          handleClick={handleSorting}
          setSortIcon={setSortIcon}
          sortIcon={sortIcon}
        />
      </div>
    </article>
  );
};

export default QuotePage;
