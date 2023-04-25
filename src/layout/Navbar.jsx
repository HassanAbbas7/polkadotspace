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
  const languageList = ["en", "fr"];
  const [openLanguages, setOpenLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languageList[0]);
  const langaugesIconRef = useRef(null);


  setTimeout(function(){
    setFavs(localStorage.getItem("favs"));
  }, 2000);

  const applyLangaugeOnClick = (e) => {
    if (langaugesIconRef.current) {
      setSelectedLanguage(e.target.textContent);
      setOpenLanguages(false);
    }
  };

  // Set Sidebar State
  const [openNavbar, setOpenNavbar] = useState(false);
  const barsRefIcon = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);

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
        <div className="app_navbar-items_language cursor-pointer relative font-[200] w-2/8">
          <div
            className="app_navbar-items_language-icon flex justify-between"
            onClick={() => setOpenLanguages(!openLanguages)}
            ref={langaugesIconRef}
          >
            <span className="text-[15px] md:text-[30px]">{arrowDownIcon}</span>
            <span className="ml-2 text-[15px] md:text-[30px]">
              {selectedLanguage}
            </span>
          </div>
          <ul
            className={`px-2 absolute -left-1 w-12 md:w-20 text-[12px] md:text-[30px] rounded z-[24244] ${
              openLanguages ? "top-100" : "-top-64"
            }`}
          >
            {languageList.map((lang, i) => {
              return (
                <li
                  className="cursor-pointer border-b-2"
                  onClick={(e) => applyLangaugeOnClick(e)}
                  key={i}
                >
                  {lang}
                </li>
              );
            })}
          </ul>
        </div>

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

        <div
          className="app_navbar-items_bars cursor-pointer text-right mx-1"
          onClick={() => setOpenNavbar(!openNavbar)}
          ref={barsRefIcon}
        >
          <span className="text-[25px] md:text-[40px]">{barsIcon}</span>
        </div>
      </div>
      <Sidebar
        openNavbar={openNavbar}
        setOpenNavbar={setOpenNavbar}
        barsRefIcon={barsRefIcon}
      />
    </div>
  );
};

export default Navbar;
