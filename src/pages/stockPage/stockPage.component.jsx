import React, { useEffect, useState } from "react";
import Table from "../../components/table/table.component";
import { getService } from "../../services/getService";
import classes from "./stockPage.module.css";
import { TextField } from "@mui/material";
import { basePoint, massageData } from "../../utils";
import FuzzySearch from "fuzzy-search";
import { useHistory } from "react-router-dom";

const StockPage = () => {
  const history = useHistory();
  const [stockTableData, setStockTableData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

  /**
   *
   * @param {*} value
   * Function to handle the click action on Stock Tables Symbol Entries
   * to redirect to the Quotes page where quote table is implemented
   */

  const handleSymbolClick = (value) => {
    history.push({
      pathname: "/quotes",
      search: `?searchTerm=${value}`,
    });
  };

  /**
   * Function to get data from API for Stocks Table
   *
   */
  const getSockPageData = async () => {
    try {
      const response = await getService(`${basePoint}/instruments`);
      if (response && response?.data) {
        var values = response.data.split("\n");
        values = values.slice(0, -1);
        let formattedData = massageData(values);
        setStockTableData(formattedData);
        setApiData(formattedData);
        setTableHeader(values[0].split(","));
      }
    } catch (err) {
      console.log("Something went wrong");
    }
  };
  /**
   *
   * @param {*} e
   *
   * Function to Fuzzy Search the table entries and update the table with the new values after search
   */

  const handleChange = (e) => {
    const initiateSearch = new FuzzySearch(apiData, ["Symbol", "Name"]);
    setStockTableData([...initiateSearch.search(e.target.value)]);
  };

  /**
   * Called upon page load to get data from API
   */
  useEffect(() => {
    getSockPageData();
  }, []);

  return (
    <article className={classes.container}>
      <div className={classes.pageName}>STOCK TABLE</div>

      <div className={classes.tableWrapper}>
        <TextField
          sx={{ width: "15rem" }}
          id="standard-basic"
          label="Search here"
          type="search"
          variant="standard"
          onChange={(e) => handleChange(e)}
        ></TextField>
        <Table
          tableHeader={tableHeader}
          tableData={stockTableData}
          tableType={"stock"}
          handleClick={handleSymbolClick}
        />
      </div>
    </article>
  );
};

export default StockPage;
