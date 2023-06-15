const axios = require('axios')
const { recipe, diets } = require('../db');
const { Sequelize } = require('sequelize')
const { URL, API_KEY } = process.env
const fullURL = `${URL}&apiKey=${API_KEY}&number=100`

const getApiInfo = async () => {
    const apiUrl = await axios.get(fullURL)
    // console.log(apiUrl.data.results);
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            img: e.image,
            summary: e.summary,
            healthScore: e.healthScore,
            analyzedInstructions: e.analyzedInstructions
        }

    })

    return apiInfo
}
const getDbInfo = async () => {
    return await recipe.findAll({
        include: {
            model: diets,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
};

const getAllRecipes = async (req , res) => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    // console.log(allInfo);
    return res.status(200).json(allInfo);
}

const recipeQuery = async (req, res) => {
    const { name } = req.query;
    const recipesTotal = await getAllRecipes();
    console.log(recipesTotal)

    if (name) {
        let recipeName = await recipesTotal.filter((e) => e.title.toLowerCase().includes(name.toLowerCase()));
        recipeName.length ?
            res.status(200).json(recipeName) :
            res.status(404).send('Recipe not found');
    } else {
        res.status(200).json(recipesTotal);
    }
};

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes,
    recipeQuery
};