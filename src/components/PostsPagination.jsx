import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const arrowDownIcon = <FontAwesomeIcon icon={faCaretDown} />;

export default function PostsPagination({
  type,
  totalCount,
  setPage,
  setSize,
}) {
  const articlesCount = [5, 10, 15];
  const [openList, setOpenList] = React.useState(false);
  const [selectedCount, setSelectedCount] = React.useState(articlesCount[0]);
  const listIconRef = React.useRef(null);

  const applyArticlesOnClick = (e) => {
    if (listIconRef.current) {
      console.log(`apply article: `, e.target.textContent);
      setSelectedCount(parseInt(e.target.textContent.slice(0, 2)));
      setSize(parseInt(e.target.textContent.slice(0, 2)));
      setOpenList(false);
    }
  };

  return (
    <div className="app_pagination flex justify-center items-center flex-col md:flex-row mt-[16.5rem]">
      <div className="app_pagination-stack border-[1px] rounded-full py-[15px] mr-[18px] text-[10px] order-2 md:order-1">
        <Stack spacing={2}>
          <Pagination
            count={
              totalCount ? Math.ceil(totalCount / selectedCount) : selectedCount
            }
            onChange={(e) => setPage(e.target.textContent)}
          />
        </Stack>
      </div>

      <div className="app_pagination-articles_count app_navbar-items_language cursor-pointer relative pr-6 font-[200] mb-8 md:mb-0 order-1 md:order-2">
        <div
          className="app_navbar-items_language-icon flex justify-between py-2 px-4 border-2 rounded-full text-[12px] md:text-[20px] font-[300]"
          onClick={() => setOpenList(!openList)}
          ref={listIconRef}
        >
          <span>{arrowDownIcon}</span>
          <span className="mx-2">{+selectedCount}</span>
          <span>{type}</span>
        </div>
        <ul
          className={`absolute -left-2 w-full text-[12px] md:text-[20px] border-2 rounded-[7px] mt-2 px-8 ${
            openList ? "block" : "hidden"
          }`}
        >
          {articlesCount.map((count, i) => {
            return (
              <li
                className="cursor-pointer border-b-[1px] py-2"
                onClick={(e) => applyArticlesOnClick(e)}
                key={i}
              >
                {count} {type}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
