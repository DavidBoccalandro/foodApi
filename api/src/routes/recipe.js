const { Router } = require('express');
const { Diets, Recipe } = require('../db');
const { allRecipesApiDb } = require("./api_db");

const router = Router();