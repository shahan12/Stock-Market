import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Table from "../../components/table/table.component";
import { getService } from "../../services/getService";
import { basePoint } from "../../utils";
import classes from "./quotePage.module.css";
function QuotePage() {
  const history = useHistory();
  var fetchURL = history.location.search && history.location.search.split("=");
  const id = fetchURL[fetchURL.length - 1];
  const [quotesData, setQuotesData] = useState({});

  const [quotes, setQuotes] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sortIcon, setSortIcon] = useState({ asc: false, dsc: false });
  const [trigger, setTrigger] = useState(false);
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

  const checkForvalidTime = (itm) => {
    let minTime = new Date(itm[0].valid_till).getTime();
    itm.every(({ valid_till }) => {
      if (new Date(valid_till).getTime() < Date.now()) {
        // setTrigger((previous) => !previous);
        getQuotesData();
        return false;
      } else {
        if (new Date(valid_till).getTime() < minTime) {
          minTime = new Date(valid_till).getTime();
        }
      }
    });
    // setTimeout(() => {
    //   getQuotesData();
    // }, [minTime]);
  };

  const getQuotesData = async () => {
    try {
      const response = await getService(`${basePoint}/quotes/${id}`);
      if (response) {
        var value = response.data;
        setQuotesData(value);
        if (value.success === true) {
          setQuotes(value.payload[id]);
          setHeaderData(Object.keys(value.payload[id][0]));
          // checkForvalidTime(value.payload[id]);
        } else {
          setQuotes([]);
          setHeaderData([]);
        }
      }
    } catch {
      console.log("Something went Wrong");
    }
  };

  useEffect(() => {
    getQuotesData();
    // checkForvalidTime();
  }, []);

  return (
    <article className={classes.container}>
      <div className={classes.pageName}>QUOTES TABLE FOR {id}</div>

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
}

export default QuotePage;
