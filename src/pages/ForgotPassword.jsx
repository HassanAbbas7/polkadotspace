import React, { useState } from 'react';
import axios from 'axios';
import { FORGOT_PASSWORD } from "../commons/constant";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();


    axios.post( `${FORGOT_PASSWORD}` , {
        email: localStorage.getItem("email")
    })
  .then(response => {
    console.log(response.status);
  })
  .catch(error => {
    console.log(error);
  });
  setDone(true);

  }

  return (
    done? (<h1 className="text-center font-bold text-pink-500">Done! Please check your email for the confirmation link!</h1>) :
    <div className="app_forms w-full lg:w-9/12 xl:w-8/12 2xl:w-7/12 mx-auto my-15 py-20 px-4 sm:px-10 md:px-20 rounded-3xl bg-white">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-pink-600">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium text-pink-400">Confirm Your Email:</label>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-2 rounded-lg py-3 px-4 font-normal"
              placeholder="Enter your email address"
            />
          </div>
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
