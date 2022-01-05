import {
	GET_ALL_RECIPES,
	GET_DETAILS,
	SEARCH_BY_NAME,
} from "../actions/actionTypes";

const initialState = {
	recipes: [],
	details: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_RECIPES:
			return {
				...state,
				recipes: action.payload,
			};
		case GET_DETAILS:
			return {
				...state,
				details: action.payload,
			};
		case SEARCH_BY_NAME:
			return {
				...state,
				recipes: action.payload,
			};
		default:
			return state;
	}
}

export default rootReducer;
