import React, { useState, useEffect } from "react";
import Headerdash from "../Components/Headerdash";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../toolkit/slices/name";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((s) => s.user);
  const [me, setMe] = useState([]);
  const [loading, setLoading] = useState(false);

  function deleteProfile() {
    let modal = confirm("Are you sure? This can NOT be undone!");
    if (modal) {
      async function del() {
        try {
          let {
            data: { message },
          } = axios.delete("/profile");

          toast(message, { type: "warning" });
        } catch (error) {
          console.log(error);
        }
      }
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  useEffect(() => {
    async function name() {
      try {
        setLoading(true);
        let { data } = await axios.get("/profile/me");
        setMe(data);
        dispatch(addUser(data));
        console.log(data);
      } catch (error) {
        // toast(error?.response?.data?.msg, { type: "error" });
      } finally {
        setLoading(false);
      }
    }
    name();
  }, []);

  return (
    <div id="dashboard">
      <Headerdash />
      <div className="container">
        <h1>Dashboard</h1>
        {me?._id ? (
          <>
            <div className="flex">
              <h3>
                <i className="fa-solid fa-user"></i>
                Welcome {me?.user?.name}
              </h3>
            </div>
            <div id="created">
              <Link to={"/editprofile"}>
                <button>
                  <i className="fa-solid fa-circle-user"></i>Edit Profile
                </button>
              </Link>

              <Link to={"/add-experience"}>
                <button>
                  <i className="fa-brands fa-black-tie"></i>Add experience
                </button>
              </Link>

              <Link to={"/add-education"}>
                <button>
                  <i className="fa-solid fa-graduation-cap"></i>Add Education
                </button>
              </Link>
              <h3>Experience Credentials</h3>
              <div className="flex">
                <div className="company">
                  <h5>Company</h5>
                </div>
                <div className="title">
                  <h5>Title</h5>
                </div>
                <div className="years">
                  <h5>Years</h5>
                </div>
                <div className="pustoy"></div>
              </div>
              <h3>Education Credentials</h3>
              <div className="flex">
                <div className="company">
                  <h5>School</h5>
                </div>
                <div className="title">
                  <h5>Degree</h5>
                </div>
                <div className="years">
                  <h5>Years</h5>
                </div>
                <div className="pustoy"></div>
              </div>
              <button onClick={deleteProfile} className="delete">
                <i className="fa-solid fa-user"></i>- Delete My Account
              </button>
            </div>
          </>
        ) : (
          <div>
            <h3>
              <i className="fa-solid fa-user"></i>
              Welcome {me?.user?.name}
            </h3>
            <p>You have not yet setup a profile, please add some info</p>
            <Link
              to="/create-profile"
              className="btn bg-info text-white shadow"
            >
              Create Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
