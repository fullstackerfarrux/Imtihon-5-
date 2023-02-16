import React, { useEffect } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  async function fLogin(e) {
    e.preventDefault();

    try {
      let {
        data: { token },
      } = await axios.post("/auth", values);
      axios.defaults.headers.common["x-auth-token"] = token;
      navigate("/dashboard");
      localStorage.setItem("token", token);

      toast("Akkauntingizga muvaffaqiyatli kirdingiz", { type: "success" });
    } catch (error) {
      toast(error?.response?.data?.errors[0]?.msg, { type: "error" });
    }
  }

  function fNameInput(e) {
    setValues((eski) => ({
      ...eski,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div id="login">
      <Header />
      <div className="container text-info">
        <h1>Sign In</h1>
        <div className="flex">
          <i className="fa-solid fa-user"></i>
          <h2>Sign Into Your Account</h2>
        </div>
        <form onSubmit={fLogin}>
          <input
            type="email"
            className="email"
            name="email"
            placeholder="Email Address"
            required
            value={values.email}
            onChange={fNameInput}
          />
          <input
            type="password"
            className="password"
            name="password"
            placeholder="Password"
            required
            minLength={6}
            value={values.password}
            onChange={fNameInput}
          />
          <button
            // type="submit"
            className="btn bg-info border mt-4 p-1  fs-4 text-white"
            // onClick={fRegister}
          >
            Login
          </button>
        </form>

        <div className="flex">
          <p className="text-black me-2 mt-2 fs-5">Don't have an account?</p>
          <Link to="/register" className="mt-2 fs-5">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
