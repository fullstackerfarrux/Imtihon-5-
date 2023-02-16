import React from "react";
import { Link } from "react-router-dom";

const Carddevelopers = ({ products }) => {
  return (
    <>
      {products.map((c, i) => (
        <div className="box" key={i}>
          <div className="justify">
            <div className="flex">
              <img src={c?.user?.avatar} alt="card" />
              <div className="ncv">
                <h3>{c.user?.name}</h3>
                <div className="flex">
                  <p>{c.status}</p>
                  <p className="at">{c.company ? "at" : ""}</p>
                  <p>{c.company}</p>
                </div>
                <p>{c.location}</p>
                <Link to={`/profile/${c.user._id}`} className="btn view">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="skills">
            {c.skills.map((b, index) => (
              <div key={index} className="flex">
                {index < 4 ? <i className="fa-solid fa-check"></i> : ""}
                {index < 4 ? <p>{b}</p> : ""}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Carddevelopers;
