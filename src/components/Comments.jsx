import React, { useState } from "react";

import ReplyBox from "./ReplyBox";
import CommentBox from "./CommentBox";

const Comments = ({ openComments, setOpenComments }) => {
  // Get Textarea Value
  const [areaValue, setAreaValue] = useState("");
  const [replyText, setReplyText] = useState([]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (areaValue.length <= 0) {
      return null;
    }
    setReplyText((oldArr) => [...oldArr, areaValue]);
    setAreaValue("");
  };
  return (
    <div
      className={`app_comments fixed h-screen py-10 w-[400px] right-0 transition-all duration-200 ${
        openComments ? "translate-x-full" : "translate-x-0"
      } top-0 overflow-y-scroll border-l-2 bg-white`}
    >
      <header className="flex justify-between text-[19px] px-10">
        <h2 className="">Comments (20)</h2>
        <h3
          className="cursor-pointer border-2 w-8 h-8 text-center"
          onClick={() => setOpenComments(!openComments)}
        >
          X
        </h3>
      </header>
      {/* Add Reply Box */}
      <div className="px-10">
        <ReplyBox
          areaValue={areaValue}
          setAreaValue={setAreaValue}
          onFormSubmit={onFormSubmit}
        />
        {/* Separator */}
        <div className="border-b-2 w-full h-2 absolute translate-y-[200%] left-0"></div>
      </div>
      {/* User Comment */}
      <div className="mt-12">
        {replyText.map((boxText, i) => {
          return (
            <div className="px-10" key={i}>
              <CommentBox boxText={boxText} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
