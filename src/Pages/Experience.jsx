import React, { useState } from "react";
import Headerdash from "../Components/Headerdash";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { addExperience } from "../toolkit/slices/name";
import { useDispatch } from "react-redux";

const Experience = () => {
  const [values, setValues] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    current: null,
    from: "",
    to: "",
  });
  const [check, setCheck] = useState(false);
  function checked() {
    setCheck(check === false ? true : false);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function eComplite(e) {
    e.preventDefault();

    // Validations
    if (values.title === " ") {
      toast("Job titleni to'ldirish majburiy", { type: "error" });
    }
    if (values.company === " ") {
      toast("Companyni to'ldirish majburiy", {
        type: "error",
      });
    }

    try {
      let data = await axios.put("/profile/experience", values);
      // axios.defaults.headers.common["x-auth-token"] = token;
      dispatch(addExperience(data));
      console.log(data);

      toast(message, { type: "success" });

      navigate("/dashboard");
    } catch (error) {
      toast(error?.response?.data?.msg, { type: "error" });
    }
  }

  function profile(e) {
    setValues((eski) => ({
      ...eski,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <div id="experience">
      <Headerdash />
      <div className="container">
        <h1>Add An Experience</h1>
        <div className="flex">
          <i className="fa-solid fa-code-branch"></i>
          <h3>
            Add any developer/programming positions that you have had in the
            past
          </h3>
        </div>
        <p>* = required field</p>
        <form onSubmit={eComplite}>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="*Job Title"
            value={values.title}
            onChange={profile}
          />

          <input
            type="text"
            name="company"
            id="company"
            placeholder="*Company"
            required
            value={values.company}
            onChange={profile}
          />
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={values.location}
            onChange={profile}
          />
          <label className="from">From Date</label>
          <input
            type="date"
            name="from"
            id="from"
            placeholder="дд.мм.гггг"
            value={values.from}
            onChange={profile}
          />
          <div className="flex">
            <input onClick={check} type="checkbox" name="check" id="check" />
            <p className="current">Current Job</p>
          </div>
          <label className="todate">To Date</label>
          <input
            type="date"
            name="to"
            id="to"
            className="date"
            placeholder="дд.мм.гггг"
            value={values.to}
            onChange={profile}
          />
          <textarea
            name="description"
            className="description"
            id="description"
            cols="125"
            rows="5"
            placeholder="Job Description"
            value={values.description}
            onChange={profile}
          ></textarea>

          <div className="flex">
            <button
              // onClick={eComplite}
              className="otpravit btn btn-info text-white"
            >
              Отправить
            </button>
            <Link to="/dashboard" className="back">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Experience;
