import React, { useState } from "react";
import axios from "axios";
import Editprofile from "../Pages/Editprofile";

const Editlinks = ({ setValues, values }) => {
  function profilee(e) {
    setValues((eski) => ({
      ...eski,
      social: {
        ...eski.social,
        [e.target.name]: e.target.value,
      },
    }));
  }

  return (
    <div id="links">
      <div className="flex">
        <i className="fa-brands fa-twitter"></i>

        <input
          type="text"
          placeholder="Twitter Url"
          className="twitter"
          name="twitter"
          value={values?.social?.twitter}
          onChange={profilee}
        />
      </div>
      <div className="flex">
        <i className="fa-brands fa-square-facebook"></i>
        <input
          type="text"
          placeholder="Facebook Url"
          className="facebook"
          name="facebook"
          value={values?.social?.facebook}
          onChange={profilee}
        />
      </div>
      <div className="flex">
        <i className="fa-brands fa-youtube"></i>
        <input
          type="text"
          placeholder="YouTube Url"
          className="youtube"
          name="youtube"
          value={values?.social?.youtube}
          onChange={profilee}
        />
      </div>
      <div className="flex">
        <i className="fa-brands fa-linkedin"></i>
        <input
          type="text"
          placeholder="Linkedin Url"
          className="linkedin"
          name="linkedin"
          value={values?.social?.linkedin}
          onChange={profilee}
        />
      </div>
      <div className="flex">
        <i className="fa-brands fa-instagram"></i>
        <input
          type="text"
          placeholder="Instagram Url"
          name="instagram"
          className="instagram"
          value={values?.social?.instagram}
          onChange={profilee}
        />
      </div>
    </div>
  );
};

export default Editlinks;
