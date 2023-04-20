import React from "react";

import person from "../assets/images/person.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faHeart } from "@fortawesome/free-solid-svg-icons";
const shareIcon = <FontAwesomeIcon icon={faShare} />;
const heartIcon = <FontAwesomeIcon icon={faHeart} size="1x" />;

const Likes = ({ likesRef, showLikes, setShowLikes }) => {
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
        Who Liked
      </h1>
      <div>
        {[
          {
            img: person,
            name: "Idirs Elba",
          },
          {
            img: person,
            name: "Idirs Elba",
          },
          {
            img: person,
            name: "Idirs Elba",
          },
          {
            img: person,
            name: "Idirs Elba",
          },
          {
            img: person,
            name: "Idirs Elba",
          },
        ].map((box, i) => {
          return (
            <div
              className="app_likes-box p-2 pr-4 rounded-[50px] flex items-center justify-between mt-[10px]"
              key={i}
            >
              <div className="w-2/12">
                <img
                  src={box.img}
                  alt="Perosn"
                  className="rounded-full w-[60px] border-[1px]"
                />
              </div>
              <h3 className="w-8/12 text-left text-[14px] md:text-[18px] pl-6 flex">
                <span>{box.name}</span>
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
