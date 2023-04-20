import React from "react";

import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const walletIcon = <FontAwesomeIcon icon={faWallet} />;
const discordIcon = <FontAwesomeIcon icon={faDiscord} />;
const facebookIcon = <FontAwesomeIcon icon={faFacebookF} />;
const twitterIcon = <FontAwesomeIcon icon={faTwitter} />;

const Footer = () => {
  return (
    <div className="app_footer pt-48 pb-20 text-center sm:text-left">
      <div className="flex flex-col lg:flex-row justify-center sm:justify-start">
        <div className="app_footer-logo w-12/12 lg:w-3/12 text-center mb-6 md:mb-0">
          <Link to="/" className="app_logo">
            <img src={logo} alt="Logo" className="w-2/3 mx-auto md:mr-auto" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-around text-center w-12/12 lg:w-5/12">
          <ul className="w-12/12 lg:w-6/12-mt-4 sm:mt-0 md:-mt-4 text-[15px] md:text-[24px]">
            {["About", "Support", "The Team"].map((link, i) => {
              return (
                <li className="mt-4" key={i}>
                  <Link to={`/pages/${link.toLowerCase()}`}>{link}</Link>
                </li>
              );
            })}
          </ul>
          <ul className="w-12/12 lg:w-6/12 mt-0 sm:mt-0 md:-mt-4 text-[15px] md:text-[24px]">
            {["Home Page", "Dashboard", "RPC Tools"].map((link, i) => {
              return (
                <li className="mt-4" key={i}>
                  {link === "Home Page" ? (
                    <Link to="/">{link}</Link>
                  ) : (
                    <Link to={`/pages/${link.toLowerCase()}`}>{link}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-12/12 sm:w-12/12 lg:w-7/12 text-center mt-6 p-6 md:mt-0 md:pt-0 border-t-2 sm:border-t-0">
          <h3 className="text-[24px]">Social Media</h3>
          <ul className="app_footer-social bordered_icons flex justify-center">
            {[walletIcon, discordIcon, facebookIcon, twitterIcon].map(
              (link, i) => {
                return (
                  <li className="mt-4" key={i}>
                    <a href="/">{link}</a>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
