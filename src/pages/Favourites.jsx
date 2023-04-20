import React, { useRef, useState, useEffect } from "react";
import { GET_ALL_ARTICLE_URL } from "../commons/constant";

import FavouritePost from "../components/FavouritePost";
import PostsPagination from "../components/PostsPagination";

const Favourites = () => {
  const [filterText, setFilterText] = useState("All");
  // Adding Active Class Link To The Filter
  const filterList = ["All", "Image", "Videos", "Articles", ""];
  const filterListRef = useRef(null);

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

  const [articles, setAritcles] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const getAllArticles = (page, size) => {
    fetch(`${GET_ALL_ARTICLE_URL}?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAritcles(data?.articles);
        setTotalCount(data?.total_elements ? data.total_elements : 0);
      })
      .catch((err) => {
        console.log(`err: `, err);
      });
  };

  useEffect(() => {
    getAllArticles(page, size);
  }, [page, size]);

  useEffect(() => {}, [articles]);

  return (
    <div className="app_favourites">
      <h1 className="text-center text-[30px] md:text-[70px] font-[700]">
        Fa<span>vourites</span>
      </h1>
      <ul
        className="app_search-filter_list flex justify-between items-start w-[320px] text-[12px] md:text-[25px] font-[500] pr-[79px] border-b-[1px] md:border-0"
        ref={filterListRef}
      >
        {renderFilterList()}
      </ul>

      <div>
        {articles?.map((article, index) => (
          <div key={index}>
            <FavouritePost filterText={filterText} article={article} />
          </div>
        ))}
      </div>
      <div>
        {articles.length > 0 && (
          <PostsPagination
            type="Articles"
            totalCount={totalCount}
            setPage={setPage}
            setSize={setSize}
          />
        )}
      </div>
    </div>
  );
};

export default Favourites;
