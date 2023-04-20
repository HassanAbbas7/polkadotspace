import React from "react";

import person from "../assets/images/person.jpg";

const BlogSidebar = ({ article }) => {
  return (
    <div className="app_blogsidebar my-6">
      <div className="app_blogsidebar-box">
        <div className="app_blogsidebar-box_author flex items-center text-[12px]">
          <img src={person} alt="Person" className="w-6 rounded-full" />
          <span className="ml-4">{article?.user?.username}</span>
          <span className="ml-10">3 mintes read</span>
        </div>
        <div className="app_blogsidebar-box_title text-[16px] font-[600] mt-4">
          <a href="/">{article?.article}</a>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
