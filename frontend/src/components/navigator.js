import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./home.js";
import Libraries from "./libraries.js";
import MyLibraries from "./mylibraries.js";
import Profile from "./profile.js";
import Authorization from "./autorization.js";
import { CgProfile } from "react-icons/cg";

function Navigator() {
  return (
    <Router>
      <div className="bg-gray-900 text-white py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">
            PublicLib
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/libraries"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                Libraries
              </Link>
            </li>
            <li>
              <Link
                to="/my-libraries"
                className="hover:text-gray-400 transition-colors duration-300"
              >
                My Libraries
              </Link>
            </li>
            <li>
            <Link
              to="/autorization"
              className="hover:text-gray-400 transition-colors duration-300 flex items-center"
            >
              <CgProfile className="text-2xl" />
            </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/libraries" element={<Libraries />}></Route>
        <Route exact path="/my-libraries" element={<MyLibraries />}></Route>
        <Route exact path="/autorization" element={<Authorization />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default Navigator;