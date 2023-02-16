import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Headerdash from "../Components/Headerdash";
import Devprofile from "../Components/Devprofile";

const Developerprofile = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function devprofile() {
      try {
        setLoading(true);
        let {
          data,
          data: { message },
        } = await axios.get(`/profile/user/${user_id}`);
        toast(message, { type: "success" });
        setUser(data);
      } catch (error) {
        // toast(error?.message, { type: "error" });
        // console.log(error);
      } finally {
        setLoading(false);
      }
    }
    devprofile();
  }, []);

  return (
    <div id="devprofile">
      <Headerdash />
      <div className="container">
        {loading ? <h1>Loading</h1> : <Devprofile profile={user} />}
      </div>
    </div>
  );
};

export default Developerprofile;
