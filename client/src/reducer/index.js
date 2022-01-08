import {
	GET_ALL_RECIPES,
	GET_DETAILS,
	SEARCH_BY_NAME,
	ALPHABET_OR_RANK_ORDER,
	GO_BACK_GET_DETAILS,
	POST_NEW_RECIPE,
	GET_DIETS,
	FILTER_BY_DIET,
} from "../actions/actionTypes";

const initialState = {
	recipes: [],
	details: [],
	diets: [],
	auxRecipes: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_RECIPES:
			return {
				...state,
				recipes: action.payload,
				auxRecipes: action.payload,
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
		case ALPHABET_OR_RANK_ORDER:
			if (action.payload === "az") {
				const sortAz = state.recipes.sort((a, b) => {
					if (a.title > b.title) {
						return 1;
					} else if (a.title < b.title) {
						return -1;
					} else {
						return 0;
					}
				});
				return {
					...state,
					recipes: sortAz,
				};
			} else if (action.payload === "za") {
				const sortZa = state.recipes.sort((a, b) => {
					if (a.title < b.title) {
						return 1;
					} else if (a.title > b.title) {
						return -1;
					} else {
						return 0;
					}
				});
				return {
					...state,
					recipes: sortZa,
				};
			} else if (action.payload === "Top Rank") {
				const sortTop = state?.recipes?.sort((a, b) => {
					if (a?.spoonacularScore < b?.spoonacularScore) {
						return 1;
					} else if (a?.spoonacularScore > b?.spoonacularScore) {
						return -1;
					} else {
						return 0;
					}
				});
				return {
					...state,
					recipes: sortTop,
				};
			} else {
				const sortLow = state?.recipes?.sort((a, b) => {
					if (a?.spoonacularScore > b?.spoonacularScore) {
						return 1;
					} else if (a?.spoonacularScore < b?.spoonacularScore) {
						return -1;
					} else {
						return 0;
					}
				});
				return {
					...state,
					recipes: sortLow,
				};
			}
		case GO_BACK_GET_DETAILS:
			return {
				...state,
				details: [],
			};
		case POST_NEW_RECIPE:
			return {
				...state,
			};
		case GET_DIETS:
			return {
				...state,
				diets: action.payload,
			};
		case FILTER_BY_DIET:
			var filterByDiet =  [];
			for(var i = 0; i < state.auxRecipes?.length; i++ ){
				if(state.auxRecipes[i].fromDb){
					for(var j= 0; j < state.auxRecipes[i].diets.length; j++){
						if (state.auxRecipes[i].diets[j].name === action.payload){
							filterByDiet.push(state.auxRecipes[i])
						}
					}
				}else{
					for(var k=0; k < state.auxRecipes[i].diets.length; k++){
						if(state.auxRecipes[i].diets[k] === action.payload){
							filterByDiet.push(state.auxRecipes[i])
						}
					}
				}
			}
			return {
				...state,
				recipes: filterByDiet,
			};
		default:
			return state;
	}
}

export default rootReducer;
