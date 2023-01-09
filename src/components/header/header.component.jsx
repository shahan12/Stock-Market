import React from "react";
import classes from "../header/header.module.css";
import Logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <article className={classes.container}>
      <header className={classes.wrapper}>
        <Link to={"/instruments"} className={classes.imgWrapper}>
          <img src={Logo} className={classes.logo}></img>
          <span>SENSIBULL</span>
        </Link>
      </header>
    </article>
  );
};

export default Header;
