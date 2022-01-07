const { Router } = require("express");
const { Diets } = require("../db");
const axios = require("axios");

const { API_KEY, API_KEY2, API_KEY3 } = process.env;
const URL = "https://api.spoonacular.com/recipes/";

const router = Router();

router.get("/",async(req,res)=>{
    const {data} = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const diets = data.results.map(r=>r.diets);
    const dietList = diets.join(",").split(",");

    for(let i = 0; i < dietList.length; i++){
        if(dietList[i].length > 2){
            await Diets.findOrCreate({
                where: {
                    name: dietList[i],
                }
            })
        }
    }

    const allDiets = await Diets.findAll();
	return res.status(200).send(allDiets);
})

module.exports = router;
