import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { PASSWORD_RESET_TOKEN } from "../commons/constant";
import axios from 'axios';



function HandlePassChange() {
   const { uid, token } = useParams();
   const [newPass, setNewPass] = useState(false);
   const [pass, setPass] = useState("password must be 8 or more characters of length")

useEffect(()=>{
    axios.get( `${PASSWORD_RESET_TOKEN}/${uid}/${token}/` , {
  })
  .then(response => {
  console.log(response.status);
//   if (response.status == 200){
    alert("asdf")
    
//   }
  })
  .catch(error => {
  console.log(error);
  });
  setNewPass(true);
}, [])

const setNewPass = async (e)=>{
    e.preventDefault()
    axios.post( `${RESET_PASSWORD_URL}/${uid}/${token}/` , {
        new_password: pass
    })
    .then(response => {
    console.log(response.status);
    if (response.status === 200){
        alert("you are ok")
    }
    })
    .catch(error => {
    console.log(error);
    });
}

  return (
    newPass ?  <form onSubmit={setNewPass}>
    <div className="mb-4">
      <label htmlFor="email" className="block mb-2 font-medium text-pink-400">Enter New Password:</label>
      <input 
        type="password"
        id="email"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        required
        className="w-full border-2 rounded-lg py-3 px-4 font-normal"
        placeholder="Enter your email address"
      />
    </div>
    <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300">Change password</button>
  </form>:
    <h1>uid: {uid}, token:{token}</h1>
  );
}

export default HandlePassChange;
