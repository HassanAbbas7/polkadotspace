import React from "react";

import person from "../assets/images/person.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faHeart } from "@fortawesome/free-solid-svg-icons";
import { GET_USERS_BY_ARTICLE_ID } from "../commons/constant";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const shareIcon = <FontAwesomeIcon icon={faShare} />;
const heartIcon = <FontAwesomeIcon icon={faHeart} size="1x" />;


const Likes = ({ likesRef, showLikes, setShowLikes, id }) => {

  const [users, setUsers] = useState([]);
  const [idk, setIdk] = useState(1);

  const getUsers = async ()=>{
      const token = getNewToken()
      const res = await fetch("https://stken99.pythonanywhere.com/get_fav_users/1", {
        method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
    'Content-Type': 'application/json'
  }
      });
      const getData = await res.json();
      setUsers(getData["Your data"]);
  }

  useEffect(()=>{
    getUsers();
  }, [idk])


  return (
    <div
      className={`app_likes rounded-[10px] p-4 absolute md:w-[500px] -bottom-8 md:left-[9rem] z-[44] h-[270px] overflow-auto ${
        showLikes ? "block" : "hidden"
      }`}
      ref={likesRef}
      onMouseEnter={() => setShowLikes(true)}
      onMouseLeave={() => setShowLikes(false)}
    >
      <h1 className="text-[20px] md:text-[35px] font-[700] my-[10px]">
        {GET_USERS_BY_ARTICLE_ID}
      </h1>
      <div>
        {users.map((box, i) => {
          return (
            <div
              className="app_likes-box p-2 pr-4 rounded-[50px] flex items-center justify-between mt-[10px]"
              key={i}
            >
              <div className="w-2/12">
                <img
                  src={person}
                  alt="Person"
                  className="rounded-full w-[60px] border-[1px]"
                />
              </div>
              <h3 className="w-8/12 text-left text-[14px] md:text-[18px] pl-6 flex">
                <span>{box.first_name} {box.last_name}</span>
                <span className="ml-4 inline-block">{shareIcon}</span>
              </h3>
              <div className="w-2/12 text-right cursor-pointer text-[30px]">
                {heartIcon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Likes;
