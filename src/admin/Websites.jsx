import React, { useState, useEffect } from "react";
import { GET_ALL_WEBSITES_URL, CREATE_WEBSITE_REQUEST_URL } from '../commons/constant';
import { getToken } from '../auth';
import AdminPanel from "./AdminPanel";
import Popup from "./Popup";
import PostsPagination from "../components/PostsPagination";
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faTwitter, faWeebly } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const facebookIcon = <FontAwesomeIcon icon={faFacebook} />;
const googleIcon = <FontAwesomeIcon icon={faGoogle} />;
const twitterIcon = <FontAwesomeIcon icon={faTwitter} />;
const webIcon = <FontAwesomeIcon icon={faWeebly} />;
const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
const plusIcon = <FontAwesomeIcon icon={faPlus} />;

const Websites = () => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [urlValue, setURLValue] = useState("");

  // const [websites, setWebsites] = useState(
  //   [
  //   { icon: googleIcon, name: "Google", url: "https://www.google.com" },
  //   {
  //     icon: twitterIcon,
  //     name: "Twitter",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "Twitter",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "facebook",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "insta",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "linkedin",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "youtube",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "stackoverflow",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "reddit",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "nvidia",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "intel",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "amd",
  //     url: "https://www.twitter.com",
  //   },
  //   {
  //     icon: twitterIcon,
  //     name: "asus",
  //     url: "https://www.twitter.com",
  //   },
  // ]);

  // const addWebsite = () => {
  //   setWebsites((webs) => [
  //     ...webs,
  //     { icon: googleIcon, name: nameValue, url: urlValue },
  //   ]);
  //   setVisiblePopup(false);
  //   setNameValue("");
  //   setURLValue("");
  // };

  const [websites, setWebsites] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const getAllWebsiteRequest = async (page, size) => {
    fetch(`${GET_ALL_WEBSITES_URL}?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
    })
      .then((res) => {
        console.log(`websites res: `, res);
        return res.json()
      })
      .then(data => {
        console.log(`websites data: `, data);
        setWebsites(data?.websites)
        setTotalCount(data?.total_elements ? data.total_elements : 0)
      })
      .catch((err) => {
        console.log(`websites err: `, err);
      })
  }

  useEffect(() => {
    getAllWebsiteRequest(page, size);
  }, [page, size]);


  const submitWebsiteRequest = async (e) => {
    e.preventDefault();
    console.log(`website req button clicked!`);

    const data = { name: nameValue, url: urlValue };
    console.log(`body: `, data);

    fetch(`${CREATE_WEBSITE_REQUEST_URL}`, {
      method: 'POST',
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        console.log(`website req res: `, res);
        if (res.status === 201) {
          toast.success("Successfully website request created");
          return res.json()
        }
        else if (res.status === 401) {
          toast.warn("Unauthorized request sent. Please login first");
        }
        return res
      })
      .then(data => {
        console.log(`website req data: `, data)
        setVisiblePopup(false);
      })
      .catch((err) => {
        console.log(`ticket err: `, err);
        toast.error("Failed to create website request. Something went wrong!")
      })
  };


  console.log("websites: ", websites);
  console.log("total count: ", totalCount);
  console.log("page: ", page);
  console.log("size: ", size);

  return (
    <div className="admin_websites">
      <h1 className="text-[70px] font-[700] text-center mb-[43px]">Websites</h1>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-[332px]">
          <AdminPanel />
        </div>
        <div className="admin_users-wrapper h-[1050px] w-[974px] p-6 rounded-[50px] grid grid-rows-6 pt-[50px]">
          <div
            className={`row-span-4 pl-[50px] pr-[110px] ${websites.length > 5 ? "overflow-hidden" : ""
              }`}
          >
            {
              websites.map((website, i) => {
                return (
                  <div
                    className={`admin_users-wrapper_box admin_websites-box flex justify-center mt-[80px]`}
                    key={i}
                  >
                    <ul className="w-1/6 bordered_icons">
                      <li>
                        <a href={website.url} >
                          {
                            website.url.includes("facebook.com") ?
                              facebookIcon
                              :
                              website.url.includes("google.com") ?
                                googleIcon
                                :
                                website.url.includes("twitter.com") ?
                                  twitterIcon
                                  :
                                  webIcon
                          }
                        </a>
                      </li>
                    </ul>
                    <div className="w-5/6 flex">
                      <div className="w-2/6">
                        <h3 className="admin_wesbites-box_name text-[22px]">
                          {website.name}
                        </h3>
                      </div>
                      <div className="w-4/6">
                        <h3 className="text-[20px] text-center break-words">
                          <a href={website.url}>{website.url}</a>
                        </h3>
                      </div>
                    </div>
                    <div
                      className="w-1-6 cursor-pointer text-[20px] ml-1"
                      onClick={(e) => {
                        setVisiblePopup(true);
                      }}
                    >
                      {editIcon}
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="admin_websites-popup text-center relative mt-6 rows-span-1 flex justify-center items-end">
            <button
              className="admin_websites-popup_plus main_btn py-1 px-[70px] text-[23px]"
              onClick={() => {
                setVisiblePopup(true);
              }}
            >
              {plusIcon}
            </button>
            <div
              className={`admin_websites-popup_box absolute bottom-[50%] bg-white ${visiblePopup ? "block" : "hidden"
                }`}
            >
              <Popup
                setVisiblePopup={setVisiblePopup}
                setNameValue={setNameValue}
                setURLValue={setURLValue}
                nameValue={nameValue}
                urlValue={urlValue}
                submitWebsiteRequest={submitWebsiteRequest}
              />
            </div>
          </div>
          {websites.length > 0 ? (
            <div className="rows-span-1 -mt-[12.5rem]">
              <PostsPagination
                type="websites"
                totalCount={totalCount}
                setPage={setPage}
                setSize={setSize}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Websites;
