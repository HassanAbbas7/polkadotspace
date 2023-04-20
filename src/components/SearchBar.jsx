import React, { useState } from "react";
import deleteMark from "../assets/images/deleteMark.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons";

const searchIcon = <FontAwesomeIcon icon={faSearch} />;
const microphoneIcon = <FontAwesomeIcon icon={faMicrophone} />;

// This Components Style Is Included In _search.scss
const SearchBar = ({ setSearchText }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleOnInputValue = (e) => {
    setSearchValue(e.target.value);
    setSearchText(e.target.value);
  };

  // Render Delete Function In Search Page
  const renderDeleteSearch = () => {
    if (window.location.href.includes("search")) {
      return (
        <>
          <img
            className={`${
              searchValue && searchValue.length > 0 ? "block" : "hidden"
            } absolute right-[26%] top-[23%] md:top-[27%] w-[13px] md:w-[32px] cursor-pointer h-[32px] md:h-[32px] border-black`}
            src={deleteMark}
            alt="Delete Search Text"
            onClick={() => setSearchValue("")}
          />
          <span
            className={`${
              searchValue && searchValue.length > 0 ? "inline-block" : "hidden"
            } h-[47px] top-[5px] md:top-0 md:h-[72px] w-[1px] absolute right-[24%] bg-black`}
          ></span>
        </>
      );
    }
  };

  return (
    <div
      className={`app_search-input ${
        window.location.href.includes("search") ? "w-5/6" : "w-full"
      } relative overflow-hidden`}
    >
      <span
        className={`absolute ${
          window.location.href.includes("search") ? "left-[2%]" : "left-[10%]"
        } top-[15px] md:top-[16px] cursor-pointe text-[15px] md:text-[22px]`}
      >
        {searchIcon}
      </span>
      <input
        type="text"
        required
        className="w-10/12 border-2 rounded-[46px] h-[47px] md:h-[4rem] indent-[30px] lg:indent-[50px] text-[15px] md:text-[20px]"
        value={searchValue}
        onChange={(e) => {
          handleOnInputValue(e);
        }}
      />

      {renderDeleteSearch()}
      <span
        className={`absolute ${
          window.location.href.includes("search")
            ? "right-[20%]"
            : "right-[11%]"
        } top-[15px] md:top-[16px] cursor-pointer text-[16px] md:text-[23px]`}
      >
        {microphoneIcon}
      </span>
    </div>
  );
};

export default SearchBar;
