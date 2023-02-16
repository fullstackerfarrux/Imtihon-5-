import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="header">
      <div className="flex header ">
        <Link to="/" className="logo">
          <i className="fa-solid fa-code"></i>
          DevConnector
        </Link>
        <ul className="flex ul  gap-3">
          <li>
            <Link className="dev">Developers</Link>
          </li>
          <li>
            <Link to="/register" className="register">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="log">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
