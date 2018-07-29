import jwt_decode from 'jwt-decode';
import axios from 'axios';

const tokenName = 'access_token';

export const storeToken = token => {
    localStorage.setItem(tokenName, token);
};

export const decodeToken = token => {
    return jwt_decode(token);
};

export const getTokenFromStorage = () => {
    return localStorage.getItem(tokenName);
};

export const isExpiredToken = token => {
    const user = decodeToken(token);
    const currentTime = Date.now() / 1000;
    return (user.exp < currentTime);
};

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};
