

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


export const setUserData = (obj) => {
    localStorage.setItem('userData', JSON.stringify(obj));
}


export const getToken = () => {
    return localStorage.getItem('access');
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