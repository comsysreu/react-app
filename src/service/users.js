import axios from 'axios';
const ENDPOINT = "http://localhost:3001";
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function getUsers() {
    return fetch(ENDPOINT)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(json => json);
}

export function saveUser(payload) {
    return fetch(ENDPOINT, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(payload)
    }).then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    })
        .then(json => json);
}

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
    };
}

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

export function createUser(creds) {
    return async (dispatch) => {
        dispatch(requestLogin());
        try {
            const response = await axios.post('/login', creds);
            const { data, status } = response;
            const { access_token, permissions, user } = data;
            if (status === 200) {
                dispatch(receiveToken(access_token, user, permissions));
                dispatch(receiveLogin());
            } else {
                dispatch(loginError('Login Fallido'));
            }
        } catch {
            dispatch(loginError('Login Fallido'));
        }
    };
}

export function receiveToken(token, userLogged, listOfPermissions) {
    return (dispatch) => {
        delete userLogged.id
        localStorage.setItem('cp-app', token);
        localStorage.setItem('allPermission', JSON.stringify(listOfPermissions));
        localStorage.setItem('user', JSON.stringify(userLogged));
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        dispatch(receiveLogin());
    }
}