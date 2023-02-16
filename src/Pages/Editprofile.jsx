import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Headerdash from "../Components/Headerdash";
import Editlinks from "../Components/Editlinks";

const Editprofile = () => {
  const [values, setValues] = useState({
    status: "",
    skills: [],
    company: "",
    website: "",
    location: "",
    github: "",
    bio: "",
    social: {
      twitter: "https://",
      facebook: "https://",
      youtube: "https://",
      linkedin: "https://",
      instagram: "https://",
    },
  });
  const [editprofile, setEditprofile] = useState([]);

  const [links, setLinks] = useState(false);

  const navigate = useNavigate();
  //   function setprofile() {
  //     values.status = editprofile?.status;
  //     values.skills = editprofile?.skills;
  //   }
  //   setprofile();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  function editlinks() {
    setLinks(links === false ? true : false);
  }

  const staticData = [
    {
      value: "selected",
      label: "* Select Professional Status",
    },
    {
      value: "developer",
      label: "Developer",
    },
    {
      value: "junior",
      label: "Junior Developer",
    },
    {
      value: "senior",
      label: "Senior Developer",
    },
    {
      value: "manager",
      label: "Manager",
    },
    {
      value: "student",
      label: "Student or Learning",
    },
    {
      value: "teacher",
      label: "Instructor or Teacher",
    },
    {
      value: "intern",
      label: "Intern",
    },
    {
      value: "other",
      label: "Other",
    },
  ];
  useEffect(() => {
    async function getValues() {
      try {
        let { data } = await axios.get("/profile/me");
        // axios.defaults.headers.common["x-auth-token"] = token;
        setEditprofile(data);

        toast(message, { type: "success" });

        navigate("/dashboard");
      } catch (error) {
        toast(error?.response?.data?.msg, { type: "error" });
      }
    }
    getValues();
  }, [values]);

  async function fComplite(e) {
    e.preventDefault();

    // Validations
    if (values.skills === " ") {
      toast("Skillsni to'ldirish majburiy", { type: "error" });
    }
    if (values.profession === " ") {
      toast("Select Professional Statusni to'ldirish majburiy", {
        type: "error",
      });
    }

    try {
      let {
        data: { message },
      } = await axios.post("/profile", values);
      // axios.defaults.headers.common["x-auth-token"] = token;

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
    <div id="createprofile">
      <Headerdash />
      <div className="container">
        <h1>Edit Your Profile</h1>
        <div className="flex">
          <i className="fa-solid fa-user"></i>
          <h4>Let's get some information to make your</h4>
        </div>
        <p>* = required field</p>
        <form onSubmit={fComplite}>
          <select name="status" id="status" onChange={profile}>
            {staticData.map((v, index) => (
              <option key={index} value={v.label}>
                {v.label}
              </option>
            ))}
          </select>
          <p>Give us an idea of where you are at in your career</p>
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Company"
            value={values.company}
            onChange={profile}
          />
          <p>Could be your own company or one you work for</p>
          <input
            type="text"
            name="website"
            id="website"
            placeholder="Website"
            value={values.website}
            onChange={profile}
          />
          <p>Could be your own or a company website</p>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={values.location}
            onChange={profile}
          />
          <p>City & state suggested (eg. Boston, MA)</p>
          <input
            type="text"
            name="skills"
            id="skills"
            placeholder="*Skills"
            value={values.skills}
            onChange={profile}
          />
          <p>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</p>
          <input
            type="text"
            name="github"
            id="github"
            placeholder="Github Username"
            value={values.github}
            onChange={profile}
          />
          <p>
            CIf you want your latest repos and a Github link, include your
            username
          </p>
          <textarea
            name="bio"
            id="bio"
            cols="89"
            rows="1"
            placeholder="A short bio  of yourself"
            value={values.bio}
            onChange={profile}
          ></textarea>
          <p>Tell us a little about yourself</p>

          <div className="flex">
            <button
              type="button"
              onClick={editlinks}
              className="btn btn-primary"
            >
              Add Social Network Links
            </button>
            <p className="optional">Optional</p>
          </div>
          {links === true ? (
            <Editlinks setValues={setValues} values={values} />
          ) : (
            false
          )}

          <div className="flex">
            <button className="otpravit btn btn-info text-white">
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

export default Editprofile;
