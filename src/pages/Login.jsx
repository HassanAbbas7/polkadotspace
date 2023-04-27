import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { LOGIN_URL } from "../commons/constant";
import { setToken, setUserData } from "../auth";
import { toast } from "react-toastify";

import axios from 'axios';

const eyeIcon = <FontAwesomeIcon icon={faEye} size="xs" />;
const eyeSlashIcon = <FontAwesomeIcon icon={faEyeSlash} size="xs" />;

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const navigate = useNavigate();


   const handleSubmit = async (e) => {
   e.preventDefault();
    
    try {
        const response = await axios.post(LOGIN_URL, {
           "email": email,
            "password": password
                })

        if (response.status == 200) {
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('loggedin', true);
            toast.success(`Logged in as ${email} !`);
            window.location.href = '/';
        } else {
            toast.warn("Please provide correct credentials to your account!")
        }
    } catch (error) {
        toast.error("Something went wrong!");
        console.log(error);
    }
}

  return (
    <div className="app_forms w-12/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 lg:mx-auto m-15 py-20 px-4 sm:px-10 md:px-20 rounded-[30px] bg-white">
      <div className="text-center">
        <h2 className="text-[20px] md:text-[30px] font-[600]">
          Login to your Account
        </h2>
        <form
          className="app_forms-form md:mt-[40px] text-[12px] md:text-[18px]"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            required
            className="w-full border-2 rounded-[46px] py-3 indent-4 font-[400]"
            placeholder="Type your email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <div className="relative mt-[15px]">
            <input
              type={`${visiblePassword ? "text" : "password"}`}
              name="password"
              required
              className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
              placeholder="Type your Password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <span
              className="absolute top-2 right-6 cursor-pointer form_eye text-[20px] md:text-[25px]"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? eyeIcon : eyeSlashIcon}
            </span>
          </div>

          <p className="text-center my-6 text-pink-600"><Link to="/pages/forgotPassword">Forgot password?</Link></p>
          <div className="form_btns flex justify-between items-center mt-[25px] md:mt-[35px]">
            <button
              type="submit"
              className="main_btn w-full mr-[5px] bg-pink-600 text-white"
              onClick={() => {
                window.sessionStorage.setItem("isLogged", true);
              }}
            >
              Login
            </button>
            <Link to="/pages/register" className="btn w-full ml-[5px]">
              Register
            </Link>
          </div>
          <p className="forgot_email md:text-[20px] font-[400] mt-[25px]">
            <Link to="/pages/reset" className="text-[10px] md:text-[20px]">
              {"abc"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
