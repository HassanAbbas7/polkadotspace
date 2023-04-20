import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Requests from "../components/Requests";
import { getToken, isLoggedIn, logout, getUserData } from "../auth";
// import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { CREATE_WEBSITE_REQUEST_URL } from "../commons/constant";

const Sidebar = ({ openNavbar, setOpenNavbar, barsRefIcon }) => {
  // Requests Pop up
  const [openRequest, setOpenRequest] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [urlValue, setURLValue] = useState("");
  const [user, setUser] = useState({});

  // Sidebar Links State
  let links;
  if (isLoggedIn()) {
    links = ["Home", "Favourites", "Blog", "Contact", "AccountChange"];
  } else {
    links = ["Home", "Favourites", "Blog", "Contact"];
  }
  const sideBarRef = useRef(null);
  // const navigate = useNavigate();

  // Create Reusable Function For Closing Navabrs Floaitng Containers
  document.body.addEventListener("click", (e) => {
    if (
      barsRefIcon.current &&
      !barsRefIcon.current.contains(e.target) &&
      !sideBarRef.current.contains(e.target)
    ) {
      setOpenNavbar(false);
    }
  });

  // Create Sidebar Links Structure
  const renderLinks = () => {
    return links.map((link, i) => {
      return (
        <li
          className="sidebar_list-item"
          key={i}
          onClick={() => setOpenNavbar(false)}
        >
          {link === "Home" ? (
            <Link
              to="/"
              className="p-2 flex justify-center cursor-pointer text-lg"
            >
              {link}
            </Link>
          ) : (
            <Link
              to={`/pages/${link.toLowerCase()}`}
              className="p-2 flex justify-center cursor-pointer text-lg"
            >
              {link}
            </Link>
          )}
        </li>
      );
    });
  };

  const renderAdminLinks = () => {
    return (
      <li className="sidebar_list-item" onClick={() => setOpenNavbar(false)}>
        <Link
          to="/admin/users"
          className="p-2 flex justify-center cursor-pointer text-lg"
        >
          Users
        </Link>
        <Link
          to="/admin/websites"
          className="p-2 flex justify-center cursor-pointer text-lg"
        >
          Website Requests
        </Link>
      </li>
    );
  };

  const submitWebsiteRequest = async (e) => {
    e.preventDefault();
    console.log(`website req button clicked!`);

    const data = { name: nameValue, url: urlValue };
    console.log(`body: `, data);

    fetch(`${CREATE_WEBSITE_REQUEST_URL}`, {
      method: "POST",
      headers: {
        // "Accept": "application/json text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(`website req res: `, res);
        if (res.status === 201) {
          toast.success("Successfully website request created");
          return res.json();
        } else if (res.status === 401) {
          toast.warn("Unauthorized request sent. Please login first");
        }
        return res;
      })
      .then((data) => {
        console.log(`website req data: `, data);
        setOpenRequest(false);
      })
      .catch((err) => {
        console.log(`ticket err: `, err);
        toast.error("Failed to create website request. Something went wrong!");
      });
  };

  useEffect(() => {
    setUser(getUserData());
  }, []);

  return (
    <div
      className={`app_sidebar transition-all duration-500 pt-20 px-6 h-screen fixed right-full top-0 z-[700] ${
        openNavbar ? "translate-x-full" : "translate-x-0"
      }`}
      ref={sideBarRef}
    >
      <div className="app_sidebar-logo text-2xl">
        <Link to="/">Polkadot Space</Link>
      </div>
      <ul className="sidebar_list w-52 mt-20">{renderLinks()}</ul>
      {user?.is_superuser && (
        <ul className="sidebar_list w-52 mt-20">{renderAdminLinks()}</ul>
      )}
      <ul className="app_sidebar-auth mt-10 text-[20px] text-center">
        <li className="mb-6">
          <button
            className="btn block m-auto border-black text-black rounded"
            onClick={() => setOpenRequest(true)}
          >
            Requests
          </button>
        </li>
        {isLoggedIn() ? (
          <button
            className="border-[1px] rounded-[75px] py-1 px-[15px] md:px-[25px] text-[12px] md:text-[18px] bg-red-400 text-white mx-1"
            onClick={() => {
              console.log(`logout btn clicked`);
              logout();
              // window.location.pathname = "/"
              // window.location.reload()
            }}
          >
            logout
          </button>
        ) : (
          <div>
            <li className="mb-4">
              <Link
                to="/pages/login"
                className="btn block"
                onClick={() => setOpenNavbar(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/pages/register"
                className="btn block"
                onClick={() => setOpenNavbar(false)}
              >
                Register
              </Link>
            </li>
          </div>
        )}
      </ul>
      <div
        className={`absolute top-10 left-[120%] ${
          openRequest ? "block" : "hidden"
        }`}
      >
        <Requests
          submitWebsiteRequest={submitWebsiteRequest}
          openRequest={openRequest}
          setOpenRequest={setOpenRequest}
          setNameValue={setNameValue}
          setURLValue={setURLValue}
          nameValue={nameValue}
          urlValue={urlValue}
        />
      </div>
    </div>
  );
};

export default Sidebar;
