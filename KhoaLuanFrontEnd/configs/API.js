import axios from 'axios';

export const endpoints = {
    'login' : '/o/token',
    'current-user' : '/users/current-user/',
    'change-password': (userId) => '/users/${userId}/change-password',
    'thesis' : '/thesis/',


}

export const authAPI = (accessToken) => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Authorization" : `bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})