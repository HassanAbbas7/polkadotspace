import React, { useState } from "react";

import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";

const Main = ({ value, setValue, handleValue }) => {
  const [searchText, setSearchText] = useState("");
  console.log(`search text: `, searchText);
  // const renderButtons = () => {
  //   if (value) {
  //     return (
  //       <Link to="/pages/search" className="main_btn mt-8">
  //         Search
  //       </Link>
  //     );
  //   } else {
  //     return (
  //       <button className="main_btn mt-8 disabled:opacity-30" disabled>
  //         Search
  //       </button>
  //     );
  //   }
  // };

  return (
    <div className="app_main pt-16 xl:pt-30">
      <div className="container grid grid-rows-12 m-auto">
        <div className="items-center text-center">
          <h1 className="text-[28px] md:text-[50px] font-[700]">
            The multichain vision for <br />
            <span>Web3 </span>starts here
          </h1>
          <div className="flex flex-col items-center my-6">
            {/* <form
            className="flex flex-col items-center my-6"
            action={`/pages/search?searchKey=${searchText}`}
          > */}
            <SearchBar
              setSearchText={setSearchText}
              // value={value}
              // setValue={setValue}
              // handleValue={handleValue}
            />
            <Link
              to={`/pages/search?searchKey=${searchText}`}
              className="main_btn mt-8 text-[15px] md:text-[25px] px-[85px] md:px-[150px]"
            >
              Search
            </Link>
            {/* </form> */}
          </div>
          <div className="flex justify-evenly">
            <button className="btn text-[12px] md:text-[17px] px-[32px] md:px-[50px]">
              Polkadot Search
            </button>
            <button className="btn text-[12px] md:text-[17px] px-[32px] md:px-[50px]">
              Feeling Lucky
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
