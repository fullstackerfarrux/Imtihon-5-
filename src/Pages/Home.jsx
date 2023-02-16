import React, { useEffect } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);
  return (
    <div id="home">
      <Header />
      <div className="bg">
        <h1>Developer Connector</h1>
        <p>
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>
        <div className="flex">
          <Link to="/register" className="signup p-2 color-white bg-info mx-5">
            Sign Up
          </Link>
          <Link to="/login" className="log p-2 px-2 bg-white">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
