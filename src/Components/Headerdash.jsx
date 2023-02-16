import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Headerdash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);
  //   if (!token) navigate("/login");
  function removelog() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  }
  return (
    <div id="headerdash">
      <div className="flex headerdash ">
        <Link to="/dashboard" className="logo">
          <i className="fa-solid fa-code"></i>
          DevConnector
        </Link>
        <ul className="flex ul  gap-3">
          <li>
            <Link to="/profile" className="dev">
              Developers
            </Link>
          </li>
          <li>
            <Link to="/posts" className="posts">
              Posts
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="dashboard">
              <i className="fa-solid fa-user"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link onClick={removelog} to="/login" className="logout">
              <i className="fa-solid fa-right-from-bracket"></i>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Headerdash;
