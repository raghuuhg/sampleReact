import axios from 'axios';

const TIMEOUT = 40000;
let handlerEnabled = true;
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9004',
    timeout: TIMEOUT
})

export function isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
}

export function createJWTToken(token) {
    return 'Bearer ' + token
}

export function setupAxiosInterceptors(token) {
    console.log(token);
    axios.interceptors.request.use(
        (config) => {
            if (isUserLoggedIn()) {
                config.headers.authorization = token
            }
            return config
        }
    )
}

export function registerSuccessfulLoginForJwt(username, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    setupAxiosInterceptors(createJWTToken(token));
}

const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}

const requestHandler = (request) => {
    //if (isHandlerEnabled(request)) {
        request.headers['Access-Control-Allow-Origin'] = '*';
        request.headers['Content-Type'] = 'application/json';        
   // }
    return request
}

const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
        console.log(error);
    }
    return Promise.reject({ ...error })
}

const successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
        console.log(response);
    }
    return response
}

// Add interceptors
axiosInstance.interceptors.request.use(
    request => requestHandler(request)
)

axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)



export const useGet = (data, url) => {

    console.log(data);
    console.log(url);

    axiosInstance.get(url)
        .then(res => {
            console.log(res);
        })
}

export async function usePost (data,url) {
    console.log(data);
    console.log(url);

    try {
      let response = await axiosInstance.post(url, data)
            .then(res => {
                console.log(res);
                return res;
            }, (error) => {
                console.log(error);
                return error;
            });
        return response; 
    } catch (error) {
        console.error(error)
    }
}





