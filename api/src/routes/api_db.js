const axios = require("axios");
const { Recipe, Diets } = require("../db");

const { API_KEY } = process.env;
const URL = "https://api.spoonacular.com/recipes/";

const api = async () => {
	const recipesData = await axios.get(
		`${URL}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	);
	const recipes = recipesData.data.results.map((r) => {
		return {
			id: r.id,
			title: r.title,
			summary: r.summary,
			spoonacularScore: r.spoonacularScore,
			healthScore: r.healthScore,
			analizedInstructions: r.analyzedInstructions, // array with 1 single object> the steps property is an array with multiple objects> in each object, there is a "step" property which is a string
			image: r.image,
			diets: r.diets,
		};
	});
	return recipes;
};

const db = async () => {
	return await Recipe.findAll({
		include: {
			model: Diets,
			attributes: ["name"],
			through: {
				attributes: [],
			},
		},
	});
};

const allRecipesApiDb = async () => {
	const apiTotal = await api();
	const dbTotal = await db();
	const total = apiTotal.concat(dbTotal);
	return total;
};

module.exports = {
	allRecipesApiDb,
};
