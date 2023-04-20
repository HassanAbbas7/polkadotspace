import React, { useState, useEffect } from "react";
import { BASE_URL, UPDATE_MYSELF_USER_URL } from "../commons/constant";
import { toast } from "react-toastify";
import { getUserData, getToken, setUserData } from "../auth";

import person from "../assets/images/person.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

// const penIcon = <FontAwesomeIcon icon={faPen} />;

const AccountChange = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const [user, setUser] = useState({});

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");

  const changeFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    console.log("fileHandler clicked!");
  };

  const imageEditClicked = (e) => {
    document.getElementById("profile_image").click();
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log(`register button clicked!`);
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("wallet", wallet);
    formData.append("password", password);

    if (isSelected) {
      formData.append("image", selectedFile);
    }

    console.log("formData: ", formData);

    fetch(`${UPDATE_MYSELF_USER_URL}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    })
      .then((res) => {
        console.log(`user update res: `, res);
        if (res.status === 200) {
          toast.success("Successfully updated profile!");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.email) {
          setUserData(data);
          setUser(data);
        }
        console.log(`user update data: `, data);
      })
      .catch((err) => {
        console.log(`user update err: `, err);
        toast.error("Profile update failed!");
      });
  };

  useEffect(() => {
    const userData = getUserData();
    setFirstname(userData?.first_name);
    setLastname(userData?.last_name);
    setEmail(userData?.email);
    setWallet(userData?.profile?.wallet);
    setUser(userData);
  }, []);

  console.log("selectedFile: ", selectedFile);
  console.log("isSelected: ", isSelected);

  return (
    <div className="app_accountChange app_profile app_forms w-12/12 lg:w-10/12 xl:w-9/12 sm:mx-auto mt-6 py-[20px] px-10 md:pl-[30px] rounded-[30px] md:pr-[63px] bg-white">
      <div className="text-center">
        <div className="text-[40px] font-[600] relative flex">
          {/* <img
            src={ user?.profile?.profile_image ? `${BASE_URL}${user.profile.profile_image}` : person}
            alt="Person"
            className="rounded-full w-[125px] border-[0.5px]"
          /> */}
          <img
            src={
              isSelected
                ? `${URL.createObjectURL(selectedFile)}`
                : user?.profile?.profile_image
                ? `${BASE_URL}${user.profile.profile_image}`
                : person
            }
            alt="Person"
            className="rounded-full w-[100px] border-[0.5px]"
          />
          <span className="edit_pen absolute top-16 left-16 cursor-pointer w-[35px] h-[35px] bg-white rounded-full text-[18px] leading-[36px]">
            <FontAwesomeIcon icon={faPen} onClick={imageEditClicked} />
            <input
              id="profile_image"
              type="file"
              name="image"
              className="hidden"
              onChange={changeFileHandler}
            />
          </span>
          <h2 className="flex flex-col text-[15px] md:text-[30px] text-left justify-center ml-[16px] font-[500]">
            <span>{first_name}</span>
            <span>{last_name}</span>
          </h2>
        </div>
        <form
          className="app_forms-form mt-4 text-[12px] md:text-[18px]"
          onSubmit={updateProfile}
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 md:mr-[60px]">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                Change Name
              </label>
              <input
                type="text"
                name="first_name"
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="Name"
                value={first_name}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                Change Last name
              </label>
              <input
                type="text"
                name="last_name"
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 md:mr-[60px]">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                Change Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="****"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
                Change Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
                placeholder="Email"
              />
            </div>
          </div>
          <label className="font-[300] mt-[20px] block text-[15px] text-left ml-8 mb-[10px]">
            Change Wallet
          </label>
          <input
            type="text"
            name="wallet"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="wallet w-full border-2 rounded-[46px] py-3 indent-6 font-[400] mb-6"
            placeholder="W7Wh&weyu&ysduftudsfuW7Wh&weyu&ysduftudsfu"
          />
          <button
            className="main_btn mt-0 bg-pink-600 text-white text-[15px]"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountChange;
