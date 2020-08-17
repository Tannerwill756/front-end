import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Logo from "../logo.jpg";

export const Nav = () => {
  return (
    <div className="navBar">
      <div className="head">
        <img className="logo" src={Logo}></img>
        <h1>Expat Journal</h1>
      </div>
      <div className="navLinks">
        <Link className="link" to="/login">
          Login
        </Link>
        <Link className="link" to="/register">
          Register
        </Link>
        <Link className="link" to="/post">
          Post
        </Link>
        <Link className="link" to="/postform">
          Post Form
        </Link>
      </div>
    </div>
  );
};
