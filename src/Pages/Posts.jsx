import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Allposts from "../Components/AllPosts";
import Headerdash from "../Components/Headerdash";

const Posts = () => {
  return (
    <div>
      <Headerdash />
      <Allposts />
    </div>
  );
};

export default Posts;
