import React, { useRef, useState, useEffect } from "react";
import { useSearchParams, Link, Navigate, useNavigate } from "react-router-dom";
// import PostComponent from "../components/PostComponent";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBar from "../components/SearchBar";
import PostsPagination from "../components/PostsPagination";
import Filter from "../components/Filter";
import { DATA_SEARCH_URL, REFRESH_TOKEN_URL, CHECK_ADMIN_URL } from "../commons/constant";
import FavouritePost from "../components/FavouritePost";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../auth";





const Search = ({ value, setValue, handleValue }) => {

  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("All");
  const [isAdmin, setIsAdmin] = useState(null);
  const filterList = ["All", "Videos", ""];
  const categoryList = [
    "BTC",
    "Video BTC",
    "Pictures BTC",
  ]
  const [checkedValues, setCheckedValues] = useState([]);
  const filterListRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [activeItem, setActiveItem] = useState("All")
  const [limit, setLimit] = useState(20);
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();
  const [searchValue, setSearchValue] = useState(searchParams.get("searchKey"));


  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const incrementLimit = () =>{
    setLimit(limit+20);
  }
  //-----------------------------check if admin----------------------------------
  useEffect(() => {
    const headers = {}
    if (localStorage.getItem("loggedin")){
      headers.Authorization = "Bearer "+getToken()
    }
    fetch(CHECK_ADMIN_URL,
      {headers: headers}
    )
      .then(response => response.json())
      .then(data => {
        if (data == false) {
          setIsAdmin(false);
        }
        else {
          setIsAdmin(true);
        }
      })
      .catch(error => console.error(error));
  }, []);
  const addActiveClass = (e) => {
    const filterListChildren = Array.from(filterListRef.current.children);
    filterListChildren.forEach((child) => {
      if (!child.classList.contains("active")) {
        e.target.classList.add("active");
        setFilterText(e.target.textContent);
      } else {
        child.classList.remove("active");
      }
    });
  };


  const renderFilterList = () => {

    return filterList.map((filterText, i) => {
      return (
        <React.Fragment key={i}>
          <li
            className={`cursor-pointer md:px-10 ${
              filterText === "All" ? "active" : ""
            }`}
            onClick={(e) => addActiveClass(e)}
          >
            {filterText}
          </li>
        </React.Fragment>
      );
    });
  };

  const handleCheckboxChange = (event) => {
      const value = event.target.value;
      const isChecked = event.target.checked;
  
      if (isChecked) {
        setCheckedValues([...checkedValues, value]);
      } else {
        setCheckedValues(checkedValues.filter((v) => v !== value));
      }
    };

  const [articles, setArticles] = useState([]);
  const filteredArticles = articles?.slice(0, limit);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(false);

    const getAllArticles = async (keyword) => {
      setArticles([]);
      const headers = {
        'Content-Type': 'application/json'
      }
      if (localStorage.getItem("loggedin")){
        headers.Authorization = "Bearer "+getToken()
      }
        const res = await fetch(`${DATA_SEARCH_URL}`, {
          method: 'POST',
          body: JSON.stringify({keyword: keyword, categories: checkedValues, loggedin: localStorage.getItem("loggedin")}),
    headers: headers
        });
        const getData = await res.json();
        setArticles(getData["Your data"]);

        setLoading(false);
  
    };

  useEffect(() => {
    getAllArticles(searchValue);
    setLoading(true);
  }, [searchValue, page, size, checkedValues]);

  return (
    <div className="app_search">
      <div className="flex flex-col items-start">
        <SearchBar
          value={value}
          setValue={setValue}
          setSearchText={setSearchValue}
          handleValue={handleValue}
          loading={loading}
          setLoading={setLoading}
        />
        <span className="app_search-results_count text-[10px] md:text-[20px] md:ml-[30px] mt-[10px] font-[300]">
          about {articles?.length} results
        </span>
      </div>
      <ul
        className="app_search-filter_list flex justify-between items-start w-[320px] text-[12px] md:text-[25px] font-[500] pr-[79px] border-b-[1px] md:border-0"
        // ref={filterListRef}
      >
         <li className={`cursor-pointer md:px-10 ${activeItem === "All" ? "active" : ""}` } onClick={() => handleItemClick("All")}>All</li>
      {/* <li className={`cursor-pointer md:px-10 ${activeItem === "Image" ? "active" : ""}`}  onClick={() => handleItemClick("Image")}>Image</li> */}
      <li className={`cursor-pointer md:px-10 ${activeItem === "Videos" ? "active" : ""}`} onClick={() => handleItemClick("Videos")}>Videos</li>
      <li className="cursor-pointer md:px-10">
      <label htmlFor="min-date" style={{fontSize: "22px"}}>Min Date:</label>
      <input
     className="appearance-none bg-white border border-pink-400 rounded-md py-2 px-3 text-pink-500 placeholder-pink-400 focus:outline-none focus:shadow-outline-pink"
     placeholder="Select a date"
        type="date"
        id="min-date"
        name="min-date"
        value={minDate}
        onChange={(e)=>{setMinDate(e.target.value)}}
      />
      </li>
      <li className="cursor-pointer md:px-10">
      <label htmlFor="max-date" style={{fontSize: "22px"}}>Max Date:</label>
      <input
      className="appearance-none bg-white border border-pink-400 rounded-md py-2 px-3 text-pink-500 placeholder-pink-400 focus:outline-none focus:shadow-outline-pink"
      placeholder="Select a date"
        type="date"
        id="max-date"
        name="max-date"
        value={maxDate}
        onChange={(e)=>{setMaxDate(e.target.value)}}
      />
      </li>
    <li className="cursor-pointer md:px-10 " />
        {/* {renderFilterList()} */}
      </ul>
      <div>
        <Filter handleCheckboxChange={handleCheckboxChange} checkedValues={checkedValues} categoryList={categoryList}/>
      </div>
      <div>
        {articles?.length == 0 ? (
          loading ? (
            <Box
              sx={{
                marginTop: "5rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <div className="mt-16 text-center text-slate-500 text-[25px]">
            No articles Found
          </div>
          )
        ) : (
          filteredArticles?.map((article, index) => (
            <div key={index}>
              <FavouritePost filterText={filterText} admin={isAdmin} dates={[minDate, maxDate]} setArticles={setArticles} articles={articles} article={article} activeItem={activeItem}/>
            </div>
          ))
        )}
      </div>
      <div>
      <div className="flex flex-col items-center my-6">
    {
        (limit <= articles?.length)?
     <Link className="main_btn mt-8 text-[15px] md:text-[25px] px-[85px] md:px-[150px]" onClick={incrementLimit}>Show More</Link>: <></>
    }
</div>
      </div>
    </div>
  );
};

export default Search;
