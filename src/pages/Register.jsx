import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { REGISTER_URL } from "../commons/constant";
import { toast } from "react-toastify";
import axios from "axios";

const eyeIcon = <FontAwesomeIcon icon={faEye} size="xs" />;
const eyeSlashIcon = <FontAwesomeIcon icon={faEyeSlash} size="xs" />;

const Register = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2){
        toast.warn("Both passwords should match!")
        return
    }
    
    try {
        const response = await axios.post(`${REGISTER_URL}`, {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "password": password,
            "is_active": true
                })

        if ((response.status === 201) || (response.status === 200)) {
            toast.success("User Created Successfully!")
            navigate("/pages/login");
        }
        else {
            toast.error("Something went wrong")
            toast.error(response.status)
        }
    } catch (error) {
        toast.error(error)
    }
}

  return (
    <div className="app_forms w-12/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 lg:mx-auto m-15 py-12 px-4 sm:px-10 md:px-20 rounded-[30px] bg-white">
      <div className="text-center">
        <h2 className="text-[20px] md:text-[30px] font-[600]">
          Register Your Account
        </h2>
        <form
          className="app_forms-form md:mt-[40px] text-[12px] md:text-[18px]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="first_name"
            required
            value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
            placeholder="User Name"
          />
          <input
            type="text"
            name="last_name"
            required
            value={lastName} onChange={(e) => setLastName(e.target.value)}
            className="w-full border-2 rounded-[46px] py-3 indent-6 my-[20px]"
            placeholder="User Last Name"
          />
          <input
            type="email"
            name="email"
            required
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 rounded-[46px] py-3 indent-6"
            placeholder="User email"
          />
          <div className="relative">
            <input
              type={`${visiblePassword ? "text" : "password"}`}
              name="password1"
              required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 rounded-[46px] py-3 indent-6 my-[20px]"
              placeholder="Password"
            />
            <span
              className="absolute top-7 right-6 cursor-pointer form_eye text-[20px] md:text-[25px]"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? eyeIcon : eyeSlashIcon}
            </span>
          </div>
          <div className="relative">
            <input
              type={`${visibleConfirmPassword ? "text" : "password"}`}
              name="password2"
              required
              value={password2} onChange={(e) => setPassword2(e.target.value)}
              className="w-full border-2 rounded-[46px] py-3 indent-6"
              placeholder="Confirm  Password"
            />
            <span
              className="absolute top-2 md:top-2 right-6 cursor-pointer form_eye text-[20px] md:text-[25px]"
              onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
            >
              {visibleConfirmPassword ? eyeIcon : eyeSlashIcon}
            </span>
          </div>
          <div className="form_btns flex justify-between items-center mt-[30px]">
            <button
              type="submit"
              className="main_btn w-full mr-[5px] bg-pink-600 text-black"
            >
              Register
            </button>
            <Link className="btn w-full ml-[5px]" to="/pages/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
