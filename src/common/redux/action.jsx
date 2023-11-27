import axios from 'axios';
import * as actionTypes from './actionTypes';



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,role) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        role: role
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.setItem('reload', false);
    localStorage.removeItem('expirationDate');
    // createBrowserHistory().push('/')
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/login/', {
            email: email,
            password: password
        })
            .then(res => {
                if(res.data.status=="success"){
                    const token = res.data.token;
                const role = 'role';
                const expirationDate = new Date(new Date().getTime() + 14400 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('reload', true);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token,role));
                dispatch(checkAuthTimeout(14400));
                }
                else{
                    dispatch(authFail("Email or password incorrect"))
                    alert("Email or password incorrect")
                    //window.location.reload()
                }
                
            })
            .catch(err => {
                dispatch(authFail(err))
                console.log(err)
                alert(err.response.data.data.error)
                window.location.reload()
            })
    }
}

// export const authSignup = (username, email, password1, password2) => {
//     return dispatch => {
//         dispatch(authStart());
//         axios.post('http://localhost:8000/rest-auth/registration/', {
//             username: username,
//             email: email,
//             password1: password1,
//             password2: password2
//         })
//         .then(res => {
//             const token = res.data.key;
//             const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
//             localStorage.setItem('token', token);
//             localStorage.setItem('expirationDate', expirationDate);
//             dispatch(authSuccess(token));
//             dispatch(checkAuthTimeout(3600));
//         })
//         .catch(err => {
//             dispatch(authFail(err))
//         })
//     }
// }

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token === undefined || token === "undefined") {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token,role));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}