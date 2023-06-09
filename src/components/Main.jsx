import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import {GET_USER_DATA, CHECK_ADMIN_URL} from "../commons/constant";
import axios from "axios";
import { getToken } from "../auth";

 

const setName = async () => {
//--------------------------get names and emails and stuff----------------------

      const response = await axios.get(GET_USER_DATA, {
        headers: {
          'Authorization': `Bearer ${await getToken()}`,
          'Content-Type': 'application/json'
        }
              })

      if (response.status == 200) {
          localStorage.setItem('first_name', response.data["Names"].first_name);
          localStorage.setItem('last_name', response.data["Names"].last_name);
          localStorage.setItem('email', response.data["Names"].email);
          localStorage.setItem('favs', response.data["Favs"]);
          localStorage.setItem('image', response.data["Names"].image);
  }
  else{
    alert(response.status)
  }


}

const Main = ({ value, setValue, handleValue }) => {
  
  const [searchText, setSearchText] = useState("");
  //----------------------get names and emails and stuff------------------------
  useEffect(()=>{
    if (!localStorage.getItem('loggedIn')) setName();
  }, [])

  




  return (
    <div className="app_main pt-16 xl:pt-30">
      <div className="container grid grid-rows-12 m-auto">
        <div className="items-center text-center">
          <h1 className="text-[28px] md:text-[50px] font-[700]">
            The multichain vision for <br />
            <span>Web3 </span>starts here
          </h1>
          <div className="flex flex-col items-center my-6">

            <SearchBar
              setSearchText={setSearchText}
            />
            <Link
              to={`/pages/search?searchKey=${searchText}`}
              className="main_btn mt-8 text-[15px] md:text-[25px] px-[85px] md:px-[150px]"
            >
              Search
            </Link>
            {/* </form> */}
          </div>
          {/* <div className="flex justify-evenly">
            <button className="btn text-[12px] md:text-[17px] px-[32px] md:px-[50px]">
              Polkadot Search
            </button>
            <button className="btn text-[12px] md:text-[17px] px-[32px] md:px-[50px]">
              Feeling Lucky
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
export {setName};
