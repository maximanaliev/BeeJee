import {FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS} from "../actions/actions";

const initialState = {
    dataLoading: false,
    dataError: null,
    data: null,
    total: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, dataLoading: true};
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                dataLoading: false,
                dataError: null,
                data: action.data.tasks,
                total: action.data.total_task_count,
            };
        case FETCH_DATA_FAILURE:
            return {...state, dataError: action.error, dataLoading: false};
        default:
            return state;
    }
};

export default reducer;