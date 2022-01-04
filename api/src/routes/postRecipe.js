const { Router } = require("express");
const { Recipe, Diets } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
	let {
		title,
		summary,
		spoonacularScore,
		healthScore,
		analizedInstructions,
		image,
		diets,
	} = req.body;

	const newRecipe = await Recipe.create({
		title,
		summary,
		spoonacularScore,
		healthScore,
		analizedInstructions,
		image,
	});

	if (diets) {
		const createdDb = await Diets.findAll({
			where: {
				name: diets,
			},
		});
        await newRecipe.addDiets(createdDb);
        return res.status(200).send("Recipe created");
	}else {
        return res.status(200).send("Recipe created");
    }
});

module.exports = router;
