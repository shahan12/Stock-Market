import React, { useEffect, useState } from "react";
import Table from "../../components/table/table.component";
import { getService } from "../../services/getService";
import classes from "./stockPage.module.css";
import { TextField } from "@mui/material";
import { basePoint, massageData } from "../../utils";
import FuzzySearch from "fuzzy-search";
import { useHistory } from "react-router-dom";
function StockPage() {
  const history = useHistory();
  const [stockTableData, setStockTableData] = useState([
    "Symbol,Name,Sector,Validtill",
    "OBEROIRLTY,Oberoi Realty Limited,,2023-01-05 08:46:46",
    "GODREJCP,Godrej Consumer Products Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "HAVELLS,Havells India Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "KSCL,Kaveri Seed Company Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "BRITANNIA,Britannia Industries Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "ZEEL,Zee Entertainment Enterprises Ltd.,Media & Entertainment,2023-01-05 08:46:46",
    "LICHSGFIN,LIC Housing Finance Ltd.,Financial Services,2023-01-05 08:46:46",
    "OIL,Oil India Ltd.,Energy,2023-01-05 08:46:46",
    "TATACOMM,TATA COMMUNICATIONS,Telecom,2023-01-05 08:46:46",
    "APOLLOTYRE,Apollo Tyres Ltd.,Automobile,2023-01-05 08:46:46",
    "GRASIM,Grasim Industries Ltd.,Cement & Cement Products,2023-01-05 08:46:46",
    "DABUR,Dabur India Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "RELINFRA,Reliance Infrastructure Ltd.,Energy,2023-01-05 08:46:46",
    "RPOWER,Reliance Power Ltd.,Energy,2023-01-05 08:46:46",
    "NBCC,NBCC (India) Ltd.,Construction,2023-01-05 08:46:46",
    "DRREDDY,Dr. Reddy's Laboratories Ltd.,Pharma,2023-01-05 08:46:46",
    "HEXAWARE,Hexaware Technologies Ltd.,Information Technology,2023-01-05 08:46:46",
    "AMBUJACEM,Ambuja Cements Ltd.,Cement & Cement Products,2023-01-05 08:46:46",
    "COALINDIA,Coal India Ltd.,Metals,2023-01-05 08:46:46",
    "IFCI,IFCI Ltd.,Financial Services,2023-01-05 08:46:46",
  ]);
  const [tableHeader, setTableHeader] = useState([]);
  const [sort, setSortIcon] = useState({ asc: false, dsc: false });

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
    const initiateSearch = new FuzzySearch(convertedData, ["Symbol", "Name"]);
    setStockTableData(initiateSearch.search(e.target.value));
  };
  let convertedData = massageData([
    "Symbol,Name,Sector,Validtill",
    "OBEROIRLTY,Oberoi Realty Limited,,2023-01-05 08:46:46",
    "GODREJCP,Godrej Consumer Products Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "HAVELLS,Havells India Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "KSCL,Kaveri Seed Company Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "BRITANNIA,Britannia Industries Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "ZEEL,Zee Entertainment Enterprises Ltd.,Media & Entertainment,2023-01-05 08:46:46",
    "LICHSGFIN,LIC Housing Finance Ltd.,Financial Services,2023-01-05 08:46:46",
    "OIL,Oil India Ltd.,Energy,2023-01-05 08:46:46",
    "TATACOMM,TATA COMMUNICATIONS,Telecom,2023-01-05 08:46:46",
    "APOLLOTYRE,Apollo Tyres Ltd.,Automobile,2023-01-05 08:46:46",
    "GRASIM,Grasim Industries Ltd.,Cement & Cement Products,2023-01-05 08:46:46",
    "DABUR,Dabur India Ltd.,Consumer Goods,2023-01-05 08:46:46",
    "RELINFRA,Reliance Infrastructure Ltd.,Energy,2023-01-05 08:46:46",
    "RPOWER,Reliance Power Ltd.,Energy,2023-01-05 08:46:46",
    "NBCC,NBCC (India) Ltd.,Construction,2023-01-05 08:46:46",
    "DRREDDY,Dr. Reddy's Laboratories Ltd.,Pharma,2023-01-05 08:46:46",
    "HEXAWARE,Hexaware Technologies Ltd.,Information Technology,2023-01-05 08:46:46",
    "AMBUJACEM,Ambuja Cements Ltd.,Cement & Cement Products,2023-01-05 08:46:46",
    "COALINDIA,Coal India Ltd.,Metals,2023-01-05 08:46:46",
    "IFCI,IFCI Ltd.,Financial Services,2023-01-05 08:46:46",
  ]);

  /**
   * Called upon page load to get data from API
   */
  useEffect(() => {
    setStockTableData(convertedData);
    // getSockPageData()
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
}

export default StockPage;
