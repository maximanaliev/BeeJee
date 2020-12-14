import axiosApi from "../../axiosApi";

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const loginUser = (userData, props, clearFunc) => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/login?developer=maximanaliev', userData);
            dispatch(loginUserSuccess(
                response.data,
                props && props.close(),
                clearFunc && clearFunc(),
            ));
        } catch (error) {
            if (error.response) {
                dispatch(loginUserFailure(error.response.data));
            } else {
                dispatch(loginUserFailure({global: 'Network error or no internet'}));
            }
        }
    }
};

export const logoutUser = () => {
    return async dispatch => {
        try {
            dispatch(logoutUserSuccess());
        } catch (error) {
            console.error(error)
        }
    }
};