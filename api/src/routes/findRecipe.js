
const express = require('express');
const router = express.Router();
const { getAllRecipes } = require("../controllers/recipeGetter");
const { Recipe, Diets } = require("../db");

router.get('/', getAllRecipes);

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const allRecipes = await getAllRecipes(req, res);
        // console.log(allRecipes)
        const recipe = allRecipes.find((recipe) => recipe.id === parseInt(id));
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            const error = new Error('We could not find that ID. But do not fret, try again');
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
})



module.exports = router;