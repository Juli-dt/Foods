const axios = require('axios');
const express = require('express');
const router = express.Router();
const { getAllRecipes, getId } = require("../controllers/recipeGetter");
const { Recipe, Diets } = require("../db");

router.get('/', getAllRecipes);

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const recipe = await getId( id );

        res.status(200).json(recipe)
    } catch (error) {
        next(error);
    }
})



module.exports = router;