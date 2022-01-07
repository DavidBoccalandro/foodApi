import axios from "axios";

import {
	ALPHABET_OR_RANK_ORDER,
	GET_ALL_RECIPES,
	GET_DETAILS,
	SEARCH_BY_NAME,
	GO_BACK_GET_DETAILS,
	POST_NEW_RECIPE,
    GET_DIETS,
} from "./actionTypes";

export function getAllRecipes() {
	return async function (dispatch) {
		try {
			const res = await axios.get("http://localhost:3001/recipes");
			return dispatch({
				type: GET_ALL_RECIPES,
				payload: res.data,
			});
		} catch (e) {
			alert("Server not Responding. Please, try again later");
		}
	};
}

export function getDetails(id) {
	return async function (dispatch) {
		try {
			const res = await axios.get(`http://localhost:3001/recipes/${id}`);
			console.log(res.data);
			return dispatch({
				type: GET_DETAILS,
				payload: res.data,
			});
		} catch (e) {
			alert("Recipe not found");
		}
	};
}

export function searchByName(name) {
	return async function (dispatch) {
		try {
			const res = await axios.get(`http://localhost:3001/recipes?name=${name}`);
			return dispatch({
				type: SEARCH_BY_NAME,
				payload: res.data,
			});
		} catch (err) {
			alert("Recipe not found");
		}
	};
}

export function alphabetOrRankOrder(payload) {
	return async function (dispatch) {
		try {
			return dispatch({
				type: ALPHABET_OR_RANK_ORDER,
				payload,
			});
		} catch (err) {
			alert("Try Again");
		}
	};
}

export function goBackGetDetails() {
	return async function (dispatch) {
		try {
			return dispatch({
				type: GO_BACK_GET_DETAILS,
				details: [],
			});
		} catch (err) {
			alert("Try Again");
		}
	};
}

export function getDiets() {
	return async function (dispatch) {
		try {
			const res = await axios.get("http://localhost:3001/types");
			return dispatch({
				type: GET_DIETS,
				payload: res.data,
			});
		} catch (e) {
			alert("Try Again");
		}
	};
}

export function postNewRecipe(payload) {
	return async function (dispatch) {
		try {
			const res = await axios.post("http://localhost:3001/recipe", payload);
			return dispatch({
				type: POST_NEW_RECIPE,
				payload: res,
			});
		} catch (e) {
			alert("Try Again");
		}
	};
}