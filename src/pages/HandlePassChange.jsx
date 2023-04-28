import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { PASSWORD_RESET_TOKEN,RESET_PASSWORD_URL } from "../commons/constant";
import axios from 'axios';
import { toast } from "react-toastify";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const eyeIcon = <FontAwesomeIcon icon={faEye} size="xs" />;
const eyeSlashIcon = <FontAwesomeIcon icon={faEyeSlash} size="xs" />;


function HandlePassChange() {
   const { uid, token } = useParams();
   const [newPass, setNewPass] = useState(false);
   const [pass, setPass] = useState("")
   const [visiblePassword, setVisiblePassword] = useState(false);


useEffect(()=>{
    axios.get( `${PASSWORD_RESET_TOKEN}/${uid}/${token}/` , {
  })
  .then(response => {
  console.log(response.status);
    alert("asdf")
    
//   }
  })
  .catch(error => {
  console.log(error);
  });
  setNewPass(true);
}, [])

const setNewPassword = async (e)=>{
    e.preventDefault()
    if (pass.length <= 8){
      toast.error("Password must be at least 9 characters in length!")
    }
    axios.post( `${RESET_PASSWORD_URL}/${uid}/${token}/` , {
        new_password: pass
    })
    .then(response => {
    console.log(response.status);
    if (response.status === 200){
        toast.success("Password changed successfully!!")
    }
    })
    .catch(error => {
    console.log(error);
    });
}

  return (
    newPass ?
    
    <form onSubmit={setNewPassword}>
      <h1 className="text-[20px] md:text-[30px] font-[600] text-pink-500">Enter new Password:</h1>
    <div className="relative mt-[15px]">
            <input
              type={`${visiblePassword ? "text" : "password"}`}
              name="password"
              required
              className="w-full border-2 rounded-[46px] py-3 indent-6 font-[400]"
              placeholder="password must be 8 or more characters of length"
              value={pass}
              onChange={(e)=>{setPass(e.target.value)}}
            />
            <span
              className="absolute top-2 right-6 cursor-pointer form_eye text-[20px] md:text-[25px]"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? eyeIcon : eyeSlashIcon}
            </span>
          </div>
    <button type="submit" className="w-full bg-pink-500 text-white py-2 mt-8 rounded-lg hover:bg-pink-600 transition duration-300">Change password</button>
  </form>:
    <h1>uid: {uid}, token:{token}</h1>
  );
}

export default HandlePassChange;
