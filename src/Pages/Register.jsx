import React, { useEffect } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  async function fRegister(e) {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      toast("Parollar xato", { type: "error" });
    }

    try {
      let {
        data: { token, message },
      } = await axios.post("/users", values);

      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;

      toast("Registratsiyadan o'tildi", { type: "success" });
      navigate("/dashboard");
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
    <div id="register">
      <Header />
      <div className="container text-info">
        <h1>Sign Up</h1>
        <div className="flex">
          <i className="fa-solid fa-user"></i>
          <h2>Create Your Account</h2>
        </div>
        <form onSubmit={fRegister}>
          <input
            type="text"
            className="name"
            name="name"
            placeholder="Name"
            required
            value={values.name}
            onChange={fNameInput}
          />
          <input
            type="email"
            className="email"
            name="email"
            placeholder="Email Address"
            required
            value={values.email}
            onChange={fNameInput}
          />
          <p>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </p>
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
          <input
            type="password"
            className="cpassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            minLength={6}
            value={values.confirmPassword}
            onChange={fNameInput}
          />
          <button className="btn bg-info border mt-4 p-1  fs-4 text-white">
            Register
          </button>
        </form>

        <div className="flex">
          <p className="text-black me-2 mt-2 fs-5">Already have an account?</p>
          <Link to="/login" className="mt-2 fs-5">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
