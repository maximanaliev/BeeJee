import axiosApi from "../../axiosApi";

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const ADD_DATA_SUCCESS = 'ADD_DATA_SUCCESS';
export const UPDATE_DATA_SUCCESS = 'UPDATE_DATA_SUCCESS';

export const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
export const fetchDataSuccess = data => ({type: FETCH_DATA_SUCCESS, data});
export const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

export const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

export const updateDataSuccess = () => ({type: UPDATE_DATA_SUCCESS});

export const fetchData = (props) => {
    return async (dispatch) => {
        try {
            let url = '/?developer=maximanaliev';
            if (props.params) {
                url += `&page=${props.params}`
            }
            dispatch(fetchDataRequest());
            const response = await axiosApi.get(url);
            dispatch(fetchDataSuccess(response.data.message));
        } catch (error) {
            if (error.response) {
                dispatch(fetchDataFailure(error.response.data));
            } else {
                dispatch(fetchDataFailure({global: 'Network error or no internet'}));
            }
        }
    }
};

export const addData = (data, props, params) => {
    return async (dispatch) => {
        try {
            await axiosApi.post('/create?developer=maximanaliev', data);
            dispatch(addDataSuccess(props.dataAddSuccess()));
            dispatch(fetchData(params));
        } catch (error) {
            console.error(error);
        }
    }
};

export const updateData = (data, id, params, props) => {
    return async (dispatch) => {
        try {
            await axiosApi.post(`/edit/${id}?developer=maximanaliev`, data);
            dispatch(updateDataSuccess(props.updateSuccess()));
            dispatch(fetchData(params));
        } catch (error) {
            console.error(error);
        }
    }
};