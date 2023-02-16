import React, { useState, useEffect } from "react";

import Headerdash from "../Components/Headerdash";
import axios from "axios";
import Carddevelopers from "../Components/Carddevelopers";
import { toast } from "react-toastify";

const Developers = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        let { data } = await axios.get("/profile");
        setProfiles(data);
        toast("Malumotlar yetib keldi", { type: "success" });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();

    // retur
  }, []);

  return (
    <div id="developers">
      <Headerdash />
      <div className="container">
        <h1 className="text-info mt-5 fs-1">Developers</h1>
        <h3>
          <i className="fa-brands fa-connectdevelop"></i>
          Browse and connect with developers
        </h3>
        <div className="profiles">
          {loading ? (
            <h1 className="loading">Loading...</h1>
          ) : (
            <Carddevelopers products={profiles} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Developers;
