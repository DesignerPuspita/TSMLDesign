import fetchIntercept from 'fetch-intercept';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here

        const token = localStorage.getItem('token');

        // const decoded = jwtDecode(token);
        // const ac_time = decoded.exp * 1000;
        // if( ac_time < Date.now() ){
        //     localStorage.clear();
        // }

        config.headers.Authorization = 'Bearer '+`${token}`;

        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        console.log('requestError', error);
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        if (response.status === 401) {
            localStorage.clear();
            window.location.href = '/'; 
            return null;
        }
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        console.log('responseError', error);
        return Promise.reject(error);
    }
});

// Call fetch to see your interceptors in action.
//fetch('http://google.com');

// Unregister your interceptor
//unregister();