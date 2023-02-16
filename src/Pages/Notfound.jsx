import React from "react";
import Headerdash from "../Components/Headerdash";

const Notfound = () => {
  return (
    <div id="notfound">
      <Headerdash />
      <div className="flex page">
        <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
        <h1 className="404">Page Not Found</h1>
      </div>
      <h2>Sorry, this page does not exist</h2>
    </div>
  );
};

export default Notfound;
