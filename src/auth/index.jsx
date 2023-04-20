

export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return true
    }
    return false
}


export const setToken = (token) => {
    localStorage.setItem('token', token);
}


export const setUserData = (obj) => {
    localStorage.setItem('userData', JSON.stringify(obj));
}


export const getToken = () => {
    return localStorage.getItem('token');
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
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.location.pathname = "/"

}