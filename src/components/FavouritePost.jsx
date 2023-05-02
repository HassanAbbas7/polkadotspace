import React, { useState, useRef, useEffect } from "react";
import moment from "moment/moment";

import Likes from "./Likes";
import bitcoin from "../assets/images/bitcoin.jpg";
import imgOne from "../assets/images/01.jpg";
import imgTwo from "../assets/images/02.jpg";
import imgThree from "../assets/images/03.jpg";
import { getToken } from "../auth";
import {
  BASE_URL,
  CREATE_UPDATE_CLAP_URL,
  CREATE_UPDATE_FAV_URL,
  GET_CLAP_BY_USER_ARTICLE_ID_URL,
  GET_USERS_BY_ARTICLE_ID,
  TRANSLATE_ARTICLE_URL,
  UPDATE_DATA_URL,
  DELETE_DATA_URL
} from "../commons/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faHandsClapping,
  faHeart,
  faLanguage,
  faShare,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

const userIcon = <FontAwesomeIcon icon={faCircleUser} size="2x" />;
const heartIcon = <FontAwesomeIcon icon={faHeart} />;
const starIcon = <FontAwesomeIcon icon={faStar} />;
const shareIcon = <FontAwesomeIcon icon={faShare} />;
const discordIcon = <FontAwesomeIcon icon={faDiscord} />;
const facebookIcon = <FontAwesomeIcon icon={faFacebookF} />;
const twitterIcon = <FontAwesomeIcon icon={faTwitter} />;

const FavouritePost = ({ filterText, article, activeItem, dates, admin, setArticles, articles, includeText }) => {
  if (dates){
    const isValidDate = (article.TimeStamp > dates[0]) && (article.TimeStamp < dates[1]);
    const datesAreNotNull = (dates[0] && dates[1]);
    if (!isValidDate && datesAreNotNull) return;
  }
  if (includeText){
    alert(includeText)
    if (! article.Title.toLowerCase().includes(includeText.toLowerCase())) return;
  }


  console.log(article);
  const [articleObj, setAritcleObj] = useState(article);
  const [showLikes, setShowLikes] = useState(false);
  const [clap, setClap] = useState(article.Claps);
  const [claps, setClaps] = useState(article.Claps);
  const [langClicked, setLangClicked] = useState(false);
  const [clapAction, setClapAction] = useState(article.is_liked?1:0);
  const [favAction, setFavAction] = useState(article.is_faved?1:0);
  const [editing, setEditing] = useState(false);
  const clapRef = useRef(null);
  const langRef = useRef(null);
  const likesRef = useRef(null);
  const heartRef = useRef(null);
  const [render, setRender] = useState(true);

  const [title, setTitle] = useState(articleObj?.Title);
  const [link, setLink] = useState(articleObj?.URL);
  const [desc, setDesc] = useState(articleObj.Description);

  // Render Any Icon
  const renderIcons = (list = []) => {
    return list.map((icon, i) => {
      return (
        <li
          key={i}
          className={`mr-[5px] md:mr-[20px] ${
            activeItem === "All" ? "mr-[0px] mb-[0px]" : ""
          } lg:mr-[43px] text-[15px] md:text-[20px] mb-[15px]`}
        >
          <a href="/">{icon}</a>
        </li>
      );
    });
  };

  // Click Favourite Icon And Assign The Color
  const favIconRef = useRef(null);


  const createOrUpdateFav = async (e)=> {
    if (!localStorage.getItem("loggedin")){
      toast.warn("Please log in to like or favourite a post!");
      return
    }
    try {
        const response = await axios.get(`${CREATE_UPDATE_FAV_URL}`+ article.id, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        const act = await response.data.action
        setFavAction(parseInt(act))
    } catch (error) {
        alert(error)
    }
}

  const updateData = async (e)=>{
    e.preventDefault();
    axios.patch(`${UPDATE_DATA_URL}${article.id}/`, {
      Title: title,
      Description: desc,
      URL: link
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    })
    .then(response => {
      if (response.status === 200){
        toast.success("Edited successfully!");
        setEditing(false);
      }
      else {
        toast.error("something went wrong!")
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  const deleteData = async (e)=>{
    e.preventDefault();
    if (!confirm("Permanently delete data?")) return;
    axios.delete(`${DELETE_DATA_URL}${article.id}/`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    })
  .then(response => {
    toast.success('Data deleted successfully!');
    setRender(false);
  })
  .catch(error => {
    console.error('Error deleting data:', error);
  });
  }

  const createOrUpdateClap = async (e)=> {
    try {
      if (!localStorage.getItem("loggedin")){
        toast.warn("Please log in to like or favourite a post!");
        return
      }
      const response = await axios.get(`${CREATE_UPDATE_CLAP_URL}`+article.id, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        const claps = await response.data.claps
        const act = await response.data.action
        setClaps(claps)
        setClapAction(parseInt(act))
    } catch (error) {
        alert(error)
    }
}

  const translateArticle = async (article_id, langClicked) => {
    fetch(`${TRANSLATE_ARTICLE_URL}${article_id}?translate=${langClicked}`, {
      method: "GET",
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${getToken()}`
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return res;
      })
      .then((data) => {
        setAritcleObj(data);
      })
      .catch((err) => {
        console.log(`err: `, err);
      });
  };


  const componentStructure = () => {
    if (!render || activeItem==="Videos") return;
    return (
      <>
      <div
        className={`app_search_result mx-auto md:mx-0 flex md:pb-[25px] pl-[16px] pb-[15px] ${
          activeItem === "All" ? "pt-[12px]" : "pt-[20px]"
        } pr-[22px] md:pr-[56px] justify-between rounded-[20px] md:rounded-[50px] relative z-[200] mt-[40px] md:mt-[90px] w-6/6 md:w-9/12`}
      >
        <div
          className={`${
            activeItem === "All" ? "md:pl-[80px]" : "md:pl-[40px]"
          } w-11/12 md:w-9/12`}
        >
          <p
            className={`app_search_result-time font-[300] ${
              activeItem === "All"
                ? "leading-[12px] md:leading-[22px]"
                : "-mt-[20px] md:mt-[0px]"
            }`}
          >
            <span className="text-[10px] md:text-[18px]">
              {new Date(article.TimeStamp).toLocaleDateString()} | {new Date(article.TimeStamp).toLocaleTimeString()}
            </span>
            {/* <span className="text-[10px] md:text-[18px]">20:54pm</span> */}
          </p>
          <h1
            className={`-mt-0 lg:-mt-4 flex items-center ${
              activeItem === "All" ? "md:-ml-[65px]" : ""
            }`}
          >
            {activeItem === "All" ? (
  <div className="mr-1 text-[13px] md:text-[25px]">
    {/* <img
      src={
        articleObj?.user?.profile?.profile_image
          ? `${BASE_URL}${articleObj?.user?.profile?.profile_image}`
          : userIcon
      }
      alt="Person"
      className="w-6 md:w-10 rounded-full"
    /> */}
    <span><img src={"https://logo.clearbit.com/"+(new URL(articleObj?.URL)).origin} alt="logo" height="50" width="50" /></span>
  </div>
) : (
  ""
  // article.Images.split(",").map((image, index) => (
  //   <img src={image} key={index} />
  // ))
)}

            <div
              className={`text-[12px] md:text-[25px] my-2 text-ellipsis w-64 whitespace-nowrap overflow-hidden ${
                activeItem === "All" ? "pl-3" : "pl-0"
              }`}
            >
              {(admin && editing)? <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>:<a href={articleObj?.URL} target="_blank">
                {articleObj?.Title}
              </a>}
            </div>
          </h1>
          {
          
          (admin && editing)?
          <>
          <input
            className={`app_search_result-link -mt-4 leading-6 w-64 text-clip whitespace-nowrap overflow-hidden`}
            value={link}
            onChange={(e)=>{setLink(e.target.value)}}
          />
          <br />
            </>    : 
            <h3
            className={`app_search_result-link -mt-4 leading-6 w-64 text-clip whitespace-nowrap overflow-hidden`}
            title={articleObj?.URL}
          >
            <a
              className="text-[10px] md:text-[16px] font-[300] w-full"
              href={articleObj?.URL}
              target="_blank"
              rel="noreferrer"
            >
              {articleObj?.URL}
            </a>
          </h3>
          
          }
          
          {activeItem === "Image" ?
          //-------------------------------------------
          <div>
          <div>
            {
              article.Images.split(",").map((image, index) => (
                
                <img src={image} key={index} />
                
              ))
              }
              </div>
              </div>
              //--------------------------------------------
          : 
          //----------------------------------------------
          (
            activeItem === "Videos"? "No video found for this post!" :


            (admin && editing)? (
            <textarea id="txtid" name="txtname" rows="4" cols="50" maxlength="200" onChange={(e)=>{setDesc(e.target.value)}}>
        {desc}
</textarea>
            ) :(<p
            className={`text-[10px] md:text-[16px] font-[400] w-6/6 break-all h-[70px] overflow-hidden`}
          >
            {articleObj?.Description}
          </p>)
          )
          //------------------------------------------------
          }
          
          <ul
            className={`bordered_icons flex col-span-2 text-center relative text-[15px] md:text-[25px] ${
              activeItem !== "All"
                ? "pt-[17px] md:pt-[56px]"
                : "pt-[17px] md:pt-[33px]"
            } `}
            ref={favIconRef}
          >
            <li
              onClick={(e) => {
                e.preventDefault();
                createOrUpdateClap(article.id);
              }}
            >
              <a href={window.location.href} ref={clapRef} className={clapAction? "clicked": ""}>
                <FontAwesomeIcon
                  icon={faHandsClapping}
                  // style={{ color: `${clapAction ? "purple" : ""}` }}
                />
              </a>
            </li>
            

            <li
              onClick={(e) => {
                e.preventDefault();
                translateArticle(articleObj?.id, !langClicked);
                setLangClicked(!langClicked);
              }}
            >
              <a href={window.location.href} ref={langRef}>
                <FontAwesomeIcon
                  icon={faLanguage}
                  style={{ color: `${langClicked ? "indigo" : ""}` }}
                />
              </a>
            </li>
            <li
              onClick={(e)=>{
                e.preventDefault();
                createOrUpdateFav();
              }}
              className={"fav_icon"}
              onMouseEnter={() => setShowLikes(true)}
              onMouseLeave={() => setShowLikes(false)}

            >
              <a href={window.location.href} ref={heartRef} class={favAction?"clicked":""}>
                {window.location.href.includes("search") ? starIcon : heartIcon}
              </a>
            </li>
              {admin? <div className="ml-auto flex">
                <li><a href="#" class={editing ? "clicked" : ""}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={(e) => { setEditing(!editing) }}><path fill="currentColor" d="M494.1 117.9l-97.9-97.9c-18.8-18.8-49.1-18.8-67.9 0l-35.3 35.3 165.8 165.8 35.3-35.3c18.8-18.7 18.8-49 0-67.9zm-128.5-5.7l-236.2 236.2c-5.5 5.5-8.5 12.8-8.5 20.5v75.8c0 8.8 7.2 16 16 16h75.8c7.7 0 15-3 20.5-8.5l236.2-236.2c11.2-11.2 11.2-29.5 0-40.7l-50.7-50.7c-11.2-11.2-29.5-11.2-40.7 0zm-79.7 80.1l-36.3-36.3 44.2-44.2 36.3 36.3-44.2 44.2zm-49.8 49.9l-36.3-36.3 44.2-44.2 36.3 36.3-44.2 44.2zm49.8 49.9l-36.3-36.3 44.2-44.2 36.3 36.3-44.2 44.2zm-49.8 49.9l-36.3-36.3 44.2-44.2 36.3 36.3-44.2 44.2z"></path></svg></a></li>
                <li onClick={updateData}><a href="#" class="delete" ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 464H48c-26.5 0-48-21.5-48-48V128c0-26.5 21.5-48 48-48h32V48c0-26.5 21.5-48 48-48h128c26.5 0 48 21.5 48 48v32h32c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48zM192 80h64v48h-64V80zM96 128v288h256V128H96z"></path></svg></a></li>
                <li onClick={deleteData}>
                  <a href="#" class="delete">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                      <path fill="currentColor" d="M238.059 256L344.485 149.574c9.373-9.373 9.373-24.569 0-33.941L320.912 94.059c-9.373-9.373-24.568-9.373-33.941 0L176 200.118 69.574 93.692c-9.373-9.373-24.568-9.373-33.941 0L27.515 116.8c-9.373 9.373-9.373 24.569 0 33.941L133.941 256 27.515 362.426c-9.373 9.373-9.373 24.569 0 33.941l23.058 23.058c9.373 9.373 24.568 9.373 33.941 0L176 311.882l106.426 106.426c9.373 9.373 24.568 9.373 33.941 0l23.058-23.058c9.373-9.373 9.373-24.569 0-33.941L238.059 256z"></path>
                    </svg>
                  </a>
                </li>
              </div>:""}
              

            
            
            {/* {window.location.href.includes("favourites") ? (
              <li className="app_search_result-likes w-[56px] flex mt-[0px]">
                <img
                  src={imgOne}
                  alt="Person"
                  className="absolute rounded-full border-[0.5px] z-[4] w-[27px] md:w-[40px]"
                />
                <img
                  src={imgTwo}
                  alt="Person"
                  className="absolute rounded-full border-[0.5px] top-[3px] md:top-[2px] left-[40%] md:left-[60%] z-[3] w-[24px] md:w-[35px]"
                />
                <img
                  src={imgThree}
                  alt="Person"
                  className="absolute rounded-full border-[0.5px] top-[4px] md:top-[5px] left-[70%] md:left-[110%] z-[2] w-[21px] md:w-[30px]"
                />
                <span className="rounded-full border-[0.5px] top-[5px] md:top-[8px] text-[12px] md:text-[15px] z-[1] h-[20px] md:h-[25px] w-[20px] md:w-[25px] leading-[16px] md:leading-[20px] left-[100%] md:left-[160%] p-[2px]">
                  22
                </span>
                <p className="text-[5px] text-left md:text-[15px] absolute top-full w-52">
                  {clap?.clap_count ? clap.clap_count : 0} clap(s)
                </p>
              </li>
            ) : (
              <p className="text-[5px] text-left md:text-[15px] absolute top-full w-52">
                {claps} clap(s)
              </p>
            )} */}
            {window.location.href.includes("favourites") ? (
              <Likes
                likesRef={likesRef}
                showLikes={showLikes}
                setShowLikes={setShowLikes}
                id={article.id}
                link = {GET_USERS_BY_ARTICLE_ID+article.id}
              />
            ) : (
              ""
            )}
          </ul>
        </div>
        {activeItem !== "All" ? (
          <div className="app_search_result-images flex flex-col pt-[25px] md:pt-[30px] w-3/12 text-center">
            <div className="app_search_result-images_img">
              <img
                className="rounded-[16px] ml-auto w-full h-full md:w-[328px]"
                src={`${BASE_URL}${articleObj?.image}`}
                alt="Bitcoin"
              />
            </div>
            <ul className="app_search_result-social_icon flex flex-wrap justify-end mt-[30px] lg:mt-[29px]">
              {renderIcons([shareIcon, discordIcon, facebookIcon, twitterIcon])}
            </ul>
          </div>
        ) : (
          <ul className="app_search_result-social_icon flex flex-col text-center lg:flex-row justify-center text-[25px] mt-[29px]">
            {renderIcons([shareIcon, discordIcon, facebookIcon, twitterIcon])}
          </ul>

        )}
        
      </div>
    </>
      
      
    );
  };

  return <>{componentStructure()}</>;
};

export default FavouritePost;
