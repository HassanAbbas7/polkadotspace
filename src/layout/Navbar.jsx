import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Sidebar from "./Sidebar";
import { isLoggedIn, logout } from "../auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCaretDown,
  faBars,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const userIcon = <FontAwesomeIcon icon={faUserCircle} />;
const arrowDownIcon = <FontAwesomeIcon icon={faCaretDown} />;
const barsIcon = <FontAwesomeIcon icon={faBars} />;
const heartIcon = <FontAwesomeIcon icon={faHeart} />;

const Navbar = () => {
  const [favs, setFavs] = useState(0);
  const langaugesIconRef = useRef(null);


  setTimeout(function(){
    setFavs(localStorage.getItem("favs"));
  }, 2000);


  

  // Set Sidebar State
  const [openNavbar, setOpenNavbar] = useState(false);
  const barsRefIcon = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const links = ["Home", "Favourites", "Blog", "Contact", "AccountChange"];


  const renderLinks = () => {
    return links.map((link, i) => {
      return (
        <li
          className="block px-4 py-2 text-sm text-pink-700 hover:bg-pink-100 hover:text-pink-900"
          key={i}
          onClick={() => setIsOpen(false)}
        >
          {link === "Home" ? (
            <Link
              to="/"
              className="p-2 flex justify-center cursor-pointer text-lg"
            >
              {link}
            </Link>
          ) : (
            <Link
              to={`/pages/${link.toLowerCase()}`}
              className="p-2 flex justify-center cursor-pointer text-lg"
            >
              {link}
            </Link>
          )}
        </li>
      );
    });
  };


  useEffect(() => {
    setLoggedIn(isLoggedIn());
    
  }, [loggedIn]);

  return (
    <div className="app_navbar py-8 flex justify-between items-center">
      <div className="app_navbar-logo w-5/12 sm:w-5/12 lg:w-6/12 text-[15px] md:text-[1.88rem]">
        <Link to="/" className="app_logo">
          <img src={logo} alt="Logo" className="w-2/3 md:w-1/3" />
        </Link>
      </div>
      <div className="app_navbar-items flex justify-between items-center w-5/12 sm:w-5/12 lg:w-4/12 xl:w-3/12">
        

        {isLoggedIn() ? (
          <div className="app_navbar-items_favourites mr-2 cursor-pointer text-[25px] md:text-[42px] text-center flex items-center justify-end">
            <button
              className="border-[1px] rounded-[75px] py-1 px-[15px] md:px-[25px] text-[12px] md:text-[18px] bg-red-400 text-white mx-1"
              onClick={() => {
                console.log(`logout btn clicked`);
                logout();
                // window.location.pathname = '/'
                // window.location.reload()
              }}
            >
              logout
            </button>
            <Link to="/pages/favourites" className="text-center mx-1">
              {heartIcon} <span>{favs}</span>
            </Link>
          </div>
        ) : (
          <div className="app_navbar-items_login flex justify-center">
            <Link
              to="/pages/login"
              className="border-[1px] rounded-[75px] py-1 px-[15px] md:px-[25px] text-[12px] md:text-[18px]"
            >
              login
            </Link>
          </div>
        )}

        {isLoggedIn() ? (
          <div className="app_navbar-items_profile cursor-pointer mx-1">
            <Link
              to="/pages/accountchange"
              className="text-[25px] md:text-[40px]"
            >
              {userIcon}
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md  border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-pink-600 hover:text-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-pink-500"
          id="menu-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className="text-[25px] md:text-[40px]">{barsIcon}</span>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.707 14.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-2"
          >
            {renderLinks()}
          </div>
        </div>
      )}
    </div>
      </div>

      
    </div>
  );
};

export default Navbar;
