import axios from 'axios';
import {REFRESH_TOKEN_URL} from "../commons/constant";

export const isLoggedIn = () => {
    const token = localStorage.getItem('loggedin');
    if (token) {
        return true
    }
    return false
}


export const setToken = (token) => {
    localStorage.setItem('token', token);
}



const getNewToken = async () => {
    try {
        const res = await axios.post(REFRESH_TOKEN_URL, {
               "refresh": localStorage.getItem("refreshToken")
                    })
  const data = await res.data;
  console.log(data);
  const token = data.access;
  localStorage.setItem("accessToken", token);
  return token;
    }
    catch (e){
        console.log(e)
    }
  
  };

export const setUserData = (obj) => {
    localStorage.setItem('userData', JSON.stringify(obj));
}


export const getToken = () => {
    getNewToken();
    return localStorage.getItem('accessToken');
}


export const getUserData = (token) => {
    return JSON.parse(localStorage.getItem('userData'));
}


export const isAuthenticated = () => {
    if (getToken()) {
        return true
    }
    else {
        return false
    }
};

export const isSuperUser = () => {
    const user = getUserData();
    if(user?.is_superuser){
        return true;
    }
    return false
}


export const logout = () => {
    localStorage.clear()
    window.location.pathname = "/"

}