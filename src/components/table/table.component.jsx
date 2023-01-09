import React, { useState } from "react";
import classes from "./table.module.css";
import sortIconUp from "../../assets/images/sortUp.png";
import sortedIconUp from "../../assets/images/sortUpblack.png";

function Table({ tableHeader, tableData, tableType, handleClick, sortIcon }) {
  const getDateConverted = (data) => {
    var dateUTC = new Date(data);
    var dateUTC = dateUTC.getTime();
    var dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return String(dateIST);
    // new Date(val).getTime().toLocaleString("en-US", {
    //   timeZone: "Asia/Kolkata",
    // })
  };

  return (
    <div
      className={`${classes.table} ${
        tableType === "stock" ? classes.lessHeight : ""
      }`}
    >
      <div>
        <div className={classes.tableHeadRow}>
          {tableHeader.map((item, index) => {
            return index === 1 && tableType === "quotes" ? (
              <div
                key={`Header_${index}_${item}`}
                id={`Header_${index}`}
                className={`${classes.header} ${classes.sortwrapper}`}
              >
                <span>{item}</span>
                <div className={classes.iconscontainer}>
                  <img
                    src={sortIcon.asc ? sortedIconUp : sortIconUp}
                    className={classes.img}
                    onClick={() => {
                      handleClick("asc");
                    }}
                  ></img>
                  <img
                    src={sortIcon.dsc ? sortedIconUp : sortIconUp}
                    className={classes.imgdesc}
                    onClick={() => {
                      handleClick("dsc");
                    }}
                  ></img>
                </div>
              </div>
            ) : (
              <div
                key={`Header_${index}_${item}`}
                id={`Header_${index}`}
                className={classes.header}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {tableData.map((item, itemIndex) => (
          <div
            key={`col_${itemIndex}_${item}`}
            id={`col_${itemIndex}`}
            className={classes.tableRow}
          >
            {Object.values(item).map((val, index) =>
              index == 0 && tableType === "stock" ? (
                <div
                  key={`cell_${index}_${val}`}
                  id={`cell_${index}`}
                  className={classes.collumn}
                  onClick={() => handleClick(val)}
                >
                  {val}
                </div>
              ) : (
                <div
                  key={`cell_${index}_${val}`}
                  id={`cell_${index}`}
                  className={classes.collumn}
                >
                  {(tableType === "quotes" && index === 1) || index === 2 ? (
                    <span>{getDateConverted(val)}</span>
                  ) : (
                    <span>{val}</span>
                  )}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
