import axios from 'axios';

import { GET_ALL_RECIPES, GET_DETAILS, SEARCH_BY_NAME} from './actionTypes';

export function getAllRecipes(){
    return async function(dispatch){
        try {const res = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: res.data,
        })
        }catch(e){
            alert("Server not Responding. Please, try again later")
        }
    }
}

export function getDetails(id) {
	return async function (dispatch) {
		try {
			const res = await axios.get(`http://localhost:3001/recipes/${id}`);
            console.log(res.data)
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
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: res.data
            })
        } catch (err) {
            alert("Pokemon not found")
        };
    };
};