import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Home from "./Pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Createprofile from "./Components/Createprofile";
import Developers from "./Pages/Developers";
import Developerprofile from "./Pages/Developerprofile";
import Posts from "./Pages/Posts";
import Yourpost from "./Components/Yourpost";
import Notfound from "./Pages/Notfound";
import Editprofile from "./Pages/Editprofile";
import Experience from "./Pages/Experience";
import Education from "./Pages/Education";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-profile" element={<Createprofile />} />
        <Route path="/profile" element={<Developers />} />
        <Route path="/profile/:user_id" element={<Developerprofile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:users_id" element={<Yourpost />} />
        <Route path="/editprofile" element={<Editprofile />} />
        <Route path="/add-experience" element={<Experience />} />
        <Route path="/add-education" element={<Education />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
