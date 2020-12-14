import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
} from "../actions/usersActions";

const initialState = {
    user: null,
    loginLoading: false,
    loginError: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loginLoading: false, loginError: null, user: action.user};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error, loginLoading: false};
        case LOGOUT_USER_SUCCESS:
            return {...state, user: null};
        default:
            return state;
    }
};

export default usersReducer;