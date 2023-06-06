import React, { useRef, useState, useEffect } from "react";
import { DATA_SEARCH_URL, REFRESH_TOKEN_URL, GET_FAV_ARTICLES, GET_CATEGORY_URL } from "../commons/constant";

import SearchBar from "../components/SearchBar";
import FavouritePost from "../components/FavouritePost";
import PostsPagination from "../components/PostsPagination";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { getToken } from "../auth";
import Filter from "../components/Filter";


const Favourites = () => {
  const [activeItem, setActiveItem] = useState("All")
  const filterList = ["All", "Image", "Videos", "Articles", ""];
  const filterListRef = useRef(null);
  const [checkedValues, setCheckedValues] = useState([]);
  const [categoryList, setCategoryList] = useState([]); 


  useEffect(()=>{
    fetch(GET_CATEGORY_URL,
    )
      .then(response => response.json())
      .then(data => {
        setCategoryList([]);
        var list = [];
        data.map((item, i)=>{
          list.push(item['name']);
        })
        setCategoryList(list);
      })
      .catch(error => console.error(error));
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedValues([...checkedValues, value]);
    } else {
      setCheckedValues(checkedValues.filter((v) => v !== value));
    }
  };


  const handleItemClick = (item) => {
    setActiveItem(item);
  };


  // const renderFilterList = () => {
  //   return filterList.map((filterText, i) => {
  //     return (
  //       <React.Fragment key={i}>
  //         <li
  //           className={`cursor-pointer md:px-10 ${
  //             filterText === "All" ? "active" : ""
  //           }`}
  //           onClick={(e) => addActiveClass(e)}
  //         >
  //           {filterText}
  //         </li>
  //       </React.Fragment>
  //     );
  //   });
  // }; 

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [includeText, setIncludeText] = useState("");
 

  const getAllArticles = async () => {
  
      const res = await fetch(`${GET_FAV_ARTICLES}`, {
        method: 'GET',
  headers: {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  }
      });
      const getData = await res.json();
      setArticles(getData["Your data"]);
      setLoading(false);

  };


  useEffect(()=>{
    getAllArticles();
    setLoading(true);
  }, [activeItem])

  return (
    <div className="app_favourites">
      <div className="flex flex-col items-start">
        <SearchBar
        setIncludeText={setIncludeText}
        fromFavs = {true}
        />
        <span className="app_search-results_count text-[10px] md:text-[20px] md:ml-[30px] mt-[10px] font-[300]">
          about {articles?.length} results
        </span>
      </div>
      <h1 className="text-center text-[30px] md:text-[70px] font-[700]">
        Fa<span>vourites</span>
      </h1>
      <ul
        className="app_search-filter_list flex justify-between items-start w-[320px] text-[12px] md:text-[25px] font-[500] pr-[79px] border-b-[1px] md:border-0"
        ref={filterListRef}
      >
        {/* {renderFilterList()} */}
        <li className={`cursor-pointer md:px-10 ${activeItem === "All" ? "active" : ""}` } onClick={() => handleItemClick("All")}>All</li>
      <li className={`cursor-pointer md:px-10 ${activeItem === "Videos" ? "active" : ""}`} onClick={() => handleItemClick("Videos")}>Videos</li>
      <li className="cursor-pointer md:px-10"> </li>

      </ul>

      <div>
        <Filter handleCheckboxChange={handleCheckboxChange} checkedValues={checkedValues} categoryList={categoryList}/>
      </div>
      {/* <div>
        {articles?.map((article, index) => (
          <div key={index}>
            <FavouritePost filterText={filterText} article={article} />
          </div>
        ))}
      </div> */}
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
          articles?.map((article, index) => (
            (article.Title.toLowerCase().includes(includeText.toLowerCase()))?
            <div key={index}>
              <FavouritePost article={article} fromFav={true} activeItem={activeItem} includeText={includeText} checkedValues={checkedValues}/>
            </div>
            :
            null
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;
