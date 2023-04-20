import React, { useState } from "react";

import person from "../assets/images/person.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons";

const clappingIcon = <FontAwesomeIcon icon={faHandsClapping} />;

const CommentBox = ({ boxText }) => {
  // Set Read More State
  const [readMore, setReadMore] = useState(false);

  // Trigger Color Change On Like Click
  const [clicked, setClicked] = useState(false);

  // Render Reply Box
  const renderReplyBox = () => {
    return (
      <>
        <div className="app_comments-comment border-b-2 py-6">
          <div className="app_comments-comment_box">
            <div className="app_comments-author flex items-center">
              <img src={person} alt="Author" className="w-10 rounded-full" />
              <div className="app_comments-author_info ml-4 text-[14px] break-all">
                <h2>John Doe</h2>
                <h4 className="text-gray-400">4 months ago</h4>
              </div>
            </div>
            <div className="mt-6">
              <p
                className={`text-[14px] ${
                  !readMore ? "overflow-hidden w-full h-[60px]" : "min-h-[60px]"
                }`}
              >
                {boxText}
              </p>
              <span
                className={`hover:underline text-[12px] cursor-pointer text-blue-400`}
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read Less" : "Read More"}
              </span>
              <div className="app_comments-comment_actions flex justify-between flex-wrap">
                <div className="cursor-pointer mt-4 text-[20px] text-gray-600">
                  <span
                    onClick={() => setClicked(!clicked)}
                    className={`blog_like ${clicked ? "clicked" : ""}`}
                  >
                    {clappingIcon}
                  </span>
                  <span className="ml-1 text-[14px]">62</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{renderReplyBox()}</>;
};

export default CommentBox;
