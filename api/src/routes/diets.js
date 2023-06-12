
const { Router } = require("express");
const router = Router();
const axios = require("axios");
require("dotenv").config();
const { Diets } = require("../db");

const { URL, API_KEY } = process.env
const fullURL = `${URL}&apiKey=${API_KEY}&number=100`

router.get('/', async (req, res) => {
    const dietsApi = await axios.get(fullURL);
    const diets = dietsApi.data.results.map((e) => e.diets);
    const mapDiets = diets.flatMap((e) => e);
    mapDiets.forEach(async (e) => {
        try {
            await Diets.findOrCreate({
                where: { name: e }
            });
            const allDiets = await Diets.findAll();
            res.status(200).json(allDiets);
        } catch (error) {
            res.status(404).send('We could  not find that. Perhaps it is Harry Potter and the mystery of the diet');
        }
    });
});

module.exports = router;