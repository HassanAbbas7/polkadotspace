//-------------------------import constants------------------------
import { GET_CATEGORY_URL, KEYWORD_ADD_URL, KEYWORD_DELETE_URL, CHECK_ADMIN_URL, ADD_KEYWORD_URL } from "../commons/constant";
//-------------------------import pages and components-------------
import FavouritePost from "../components/FavouritePost";
import PostsPagination from "../components/PostsPagination";
import CircularProgress from "@mui/material/CircularProgress";
//--------------------------import modules-------------------------
import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { getToken } from "../auth";



const Admin = () => {


//-----------------------------constants and vars-----------------------


    const [isAdmin, setIsAdmin] = useState(null);
    const [categories, setCategories] = useState([]);
    const [addCategory, setAddCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    console.log(selectedCategory);
  

//--------------------------check if admin------------------------------
    // useEffect(() => {
    //   fetch(CHECK_ADMIN_URL, {
    //     headers: {
    //       "Authorization": `Bearer ${getToken()}`
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       if (data == false) {
    //         setIsAdmin(false);
    //       }
    //       else if (data==true) {
    //         setIsAdmin(true);
    //       }
    //     })
    //     .catch(error => console.error(error));
    // }, []);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = await getToken();
          const response = await fetch(CHECK_ADMIN_URL, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          const data = await response.json();
    
          if (data === false) {
            setIsAdmin(false);
          } else if (data === true) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, []);
    
//----------------------------get data-----------------------------------


  useEffect(() => {
    fetch(GET_CATEGORY_URL)
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => console.error(error));
  }, [categories]);


//------------------------category remove function----------------------------
    const handleCategoryRemove = async (id)=>{
        try {
            const response = await axios.get(`${KEYWORD_DELETE_URL}${id}`)
        } catch (error) {
            console.log(error)
        }
    }

//------------------------category add function--------------------------------
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(`${KEYWORD_ADD_URL}${addCategory}`)
        if (response.status == 200) {
        } else {
            alert("fail")
        }
    } catch (error) {
        console.log(error)
    }
  }
//-------------------------keyword add function-----------------------------------
const addKeyword = async (event) => {
  if (!(keyword || category)){
    alert("fill out all the fields!");
    return
  }
  const data = {
    keyword: keyword,
    category: selectedCategory,
  };
  try {
    const response = await axios.post(ADD_KEYWORD_URL, data);
    if (response.status === 201) {
      alert("Added!");
    } else {
      alert("Failed...");
    }
  } catch (error) {
    console.log(error);
  }
  
}


//-------------------------functions-------------------------------------------------



  return (
    <>
    {isAdmin === null ? (
      <p>Loading...</p>
    ) : (isAdmin === true) ? (
      
      <div className="app_favourites">
      <h1 className="text-center text-[30px] md:text-[70px] font-[700]">
        Ad<span>min</span>
      </h1>
      <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="categoryName" className="text-pink-600 block mb-1 font-medium">
        New Category:
      </label>
      <div className="flex items-center">
        <input
          type="text"
          id="categoryName"
          value={addCategory}
          onChange={(event) => setAddCategory(event.target.value)}
          className="px-3 py-2 border-2 border-pink-500 rounded-lg w-full mr-2 focus:outline-none focus:border-pink-600"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:bg-pink-600"
        >
          Add
        </button>
      </div>
    </form>

    <div className="mt-4">
  <h2 className="text-pink-600 font-medium mb-2">All Categories:</h2>
  <div className="py-3 px-4 rounded-md">
    <ul className="flex flex-wrap">
          {categories?.map(category => (
          <li key={category.id} className="text-white font-medium mr-2 mb-2 px-2 py-1 rounded-full bg-pink-700 relative">
          <span>{category.name}</span>
          <button onClick={() => handleCategoryRemove(category.id)} className="absolute top-0 right-0 m-1 rounded-full hover:bg-pink-600 hover:text-white focus:outline-none">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.25 5.75L10 10l4.25 4.25a.75.75 0 1 1-1.06 1.06L8.94 10l4.25 4.25a.75.75 0 1 1-1.06 1.06L7.88 10l4.25-4.25a.75.75 0 0 1 1.06 1.06L10 11.06l4.25 4.25a.75.75 0 0 1-1.06 1.06L8.94 11.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L7.88 10.94L3.63 6.69a.75.75 0 0 1 1.06-1.06L10 8.94l4.25-4.25a.75.75 0 0 1 1.06 0c.293.293.293.768 0 1.06z"/></svg>
          </button>
        </li>
        ))}
    </ul>
  </div>
</div>
<h1 class="text-center text-pink-500 text-6xl font-bold">Scraping Panel</h1>
<div className="mx-auto p-6 bg-white rounded-lg shadow-xl">
      <label className="text-pink-600 font-medium mb-2">Keyword</label>
      <input 
        className="px-3 py-2 border-2 border-pink-500 rounded-lg w-full mr-2 focus:outline-none focus:border-pink-600" 
        type="text" 
        value={keyword} 
        onChange={(e)=>{setKeyword(e.target.value)}} 
        placeholder="Enter a keyword"
      />
      <label className="text-pink-600 font-medium mb-2">Category</label> <br />
      <select 
        className="max-w-sm px-3 py-2 border-2 border-pink-500 rounded-lg w-full mr-2 focus:outline-none focus:border-pink-600"
        value={selectedCategory} 
        onChange={(e)=>{setSelectedCategory(e.target.value)}}
      >
        <option value="">Select a category</option>
        {categories?.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button 
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-16"
        onClick={addKeyword}
      >
        Scrape!
      </button>
    </div>
    </div>
    ) : (
      <p>Access denied.</p>
    )}
    </>
   
  );
};

export default Admin;
