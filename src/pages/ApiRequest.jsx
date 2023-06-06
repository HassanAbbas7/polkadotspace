import React, { useState, useEffect } from 'react';
import {GET_API_KEY_USER} from "../commons/constant";
import axios from "axios";
import {getToken} from "../auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import clipboardCopy from 'clipboard-copy';
import { toast } from "react-toastify";
 

const APIKeyRequestPage = () => {
    
    const [apiKey, setApiKey] = useState('');


    //-------------------------------check if already got the key-------------------------------
    useEffect(()=>{
        if (localStorage.getItem("apiKey") != "null"){
            setApiKey(localStorage.getItem("apiKey"));
        }
    })
    //````````````````````````````````check if already got the key END````````````````````````````

    //---------------------------------Get Api Key Logic----------------------------------------
  const handleRequestAPIKey = async () => {
        axios.get(GET_API_KEY_USER, {
            headers: {
                Authorization: `Bearer ${await getToken()}`
            }
        })
    .then(function (response) {
        setApiKey(response.data.token);
        localStorage.setItem("apiKey", response.data.token);
    })
    .catch(function (error) {
        console.error(error);
    });
  };
//``````````````````````````````Get Api Key Logic END````````````````````````````````````````````

//---------------------------------Delete Api Key Logic-----------------------------------------
  const handleDeleteAPIKey = () => {
    axios.delete(GET_API_KEY_USER, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
        .then(function (response) {
            if (response.status === 204){
                toast.success("Successfully deleted the API key!");
                setApiKey(null);
                localStorage.setItem("apiKey", null);
            }
            else{
                toase.warn("Something went wrong...");
            }
        })
        .catch(function (error) {
          console.error(error);
        });
  };
  //``````````````````````````````````Delete Api Key Logic END``````````````````````````````````






  //---------------------------------In page functions----------------------------------------

  const handleCopy = () => {
    clipboardCopy(apiKey);
    toast.success("api key copied!");
  };
  //```````````````````````````````````In page functions END```````````````````````````````````


  return (
    <div className="min-h-screen bg-pink-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 rounded-full flex flex-shrink-0 justify-center items-center text-pink-500 bg-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2C5.03 2 1 6.03 1 11a9 9 0 0 0 18 0c0-4.97-4.03-9-9-9zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm4-8h-3v3h-2v-3H6V8h3V5h2v3h3v1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="block pl-2 font-semibold text-xl self-start text-pink-700">
                <h2 className="leading-relaxed">API Key Request</h2>
                <p className="text-sm text-pink-500 font-normal leading-relaxed">
                  Request or delete your API key here.
                </p>
              </div>
            </div>
            {apiKey ? (
              <div className="mt-8">
                <p className="text-lg text-center font-semibold">Your API Key:</p>
                <div className="flex items-center justify-center mt-4">
                  <code className="text-pink-600 bg-white py-2 px-4 rounded">
                    {apiKey}
                  </code>
                  
                </div>
                <button
      type="button"
      className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleCopy}
    >
      <FontAwesomeIcon icon={faCopy} className="mr-2" />
      Copy
    </button>
                <div className="mt-6">
                  <p className="text-sm text-gray-600 font-normal leading-relaxed">
                    Use the API key in your requests to authenticate and access the API's resources.
                  </p>
                  <p className="text-sm text-gray-600 font-normal leading-relaxed mt-2">
                    Make sure to keep your API key secure and avoid sharing it with others.
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={handleDeleteAPIKey}
                  >
                    Delete API Key
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <div className="mt-4">
                  <button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={handleRequestAPIKey}
                  >
                    Request API Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
       
    {(apiKey) && <> <div class="mt-8 max-w-md mx-auto p-4 bg-white shadow rounded-lg"><h3 class="text-lg font-bold mb-2">API Key Documentation</h3>
  <pre class="text-sm bg-gray-100 rounded-lg p-4 font-mono">
    <code class="language-javascript">
      <span class="text-green-600">// Include the API key in your requests' headers</span>
      <div dangerouslySetInnerHTML={{ __html: `fetch("https://stken99.pythonanywhere.com/get_data", {
          headers: {
            <span class="text-purple-600">'Authorization':</span> <span class="text-purple-800">'Token YOUR_API_KEY',</span>
            <span class="text-purple-600">'Content-Type':</span> <span class="text-purple-800">'application/json'</span>
          },
        })` }}>
        
      </div>

      <span class="text-green-600">// Make sure to replace 'YOUR_API_KEY' with your actual API key.</span>
    </code>
  </pre>
  <p class="text-sm text-gray-600 mt-2">
    To use your API key, include it in the headers of your requests as shown in the code snippet above. Make sure to replace 'YOUR_API_KEY' with your actual API key.
  </p></div></>}
  







      </div>
    </div>
  );
};

export default APIKeyRequestPage;
