const { Router } = require("express");
const { allRecipesApiDb } = require("./api_db");

const router = Router();

router.get("/", async (req, res) => {
	try {
		const { name } = req.query;
		const recipesTotal = await allRecipesApiDb();

		if (!name) {
			return res.status(200).send(recipesTotal); // if i don't have query, i'm returning all, like a global get
		} else {                                       // else, i want to locate all recipes with any coincidence in their characters
			var nameLower = name.toLowerCase();
			var recipesFilter = [];
			for (var i = 0; i < recipesTotal.length; i++) {
				var titleLower = recipesTotal[i].title.toLowerCase();
				if (titleLower.indexOf(nameLower) !== -1) {
					recipesFilter.push(recipesTotal[i]);
				}
			}
			recipesFilter.length
				? res.status(200).send(recipesFilter)
				: res.status(404).send("Recipe not found");
		}
	} catch (e) {
		console.log(e);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const recipesTotal = await allRecipesApiDb(id);
		if (id) {
			const recipeById = await recipesTotal.filter((r) => r.id == id);
			if (recipeById.length) {
				return res.status(200).send(recipeById);
			} else {
				return res.status(404).send("Recipe not found");
			}
		}
	} catch (e) {
		console.log(e);
	}
});



module.exports = router;
