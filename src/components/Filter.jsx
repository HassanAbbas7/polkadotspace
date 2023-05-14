import React, { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
const arrowDownIcon = <FontAwesomeIcon icon={faCaretDown} />;

const Filter = ({handleCheckboxChange, checkedValues, categoryList}) => {
    
    
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const filterList = []
  const [tick, isTicked] = useState([]);
  const [checks, setChecks] = useState("");
  const renderCategories = ()=>{
    return categoryList.map((check, i) => {
      return (
        <div key={i} className="flex mt-[14px] items-center">
          <input type="checkbox" className="mr-[5px]" value={check} onChange={handleCheckboxChange}/>
          <label>{check}</label>
        </div>
      );
    })
  }
  
  console.log(checkedValues);
  const times = [
    "For 24 hours",
    "For 48 hours",
    "For 1 week",
    "For 2 week",
    "For 4 week",
    "For 3 months",
    "For 6 months",
    "For 1 year",
  ];

  return (
    <div className="app_filter rounded-[7px] w-5/6 md:w-3/6 bg-white p-[25px]">
      <div className="app_filter-menu">
        {/* This is the date filter, show results 1 day old, a week old or a year bla bla bla */}
        {/* <div className="text-[10px] md:text-[20px]">
          <span className="font-[600] mr-[7px]">Data:</span>
          <span
            className="cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            For All Time <span>{arrowDownIcon}</span>
          </span>
        </div> */}
        <ul
          className={`bg-white absolute left-[80px] md:left-[200px] w-[65px] md:w-[200px] z-[121214] border-[0.5px] rounded-[10px] px-[11px] py-[8px] border-black ${
            openMenu ? "block" : "hidden"
          }`}
        >
          {times.map((time, i) => {
            return (
              <li
                className="cursor-pointer border-b-[1px] text-[6px] md:text-[20px] py-[2px]"
                key={i}
              >
                {time}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="app_filter-checks text-[10px] md:text-[20px] font-[300] flex mt-[29px]">
      <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:bg-pink-600"
      >
        Select Category
        <svg
          className={`w-4 h-4 ml-2 ${isOpen ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 6.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
        <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg z-999" style={{zIndex: 999, display: isOpen? '' : 'none'}} >
          <div className="py-1">
            {categoryList.map((item, i) => (
              <div key={i} className="flex items-center px-4 py-2">
                <input
                  type="checkbox"
                  className="mr-2 form-checkbox text-pink-500"
                  value={item}
                  onChange={handleCheckboxChange}
                />
                <label className="text-gray-700">{item}</label>
              </div>
            ))}
          </div>
        </div>
    </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
