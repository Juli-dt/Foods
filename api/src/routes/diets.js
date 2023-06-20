
const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { diets } = require("../db");

const { URL, API_KEY } = process.env
const fullURL = `${URL}&apiKey=${API_KEY}&number=100`

router.get('/', async (req, res) => {
    const dietsApi = await axios.get(fullURL);
    const fulldiets = dietsApi.data.results.map((e) => e.diets);
    const mergedArray = [];

    fulldiets.forEach(array => {
        array.forEach(element => {
            if (!mergedArray.includes(element)) {
                mergedArray.push(element);
            }
        });
    });
    try {
        for (const e of mergedArray) {
            await diets.findOrCreate({
                where: { name: e }
            });
        }
        const allDiets = await diets.findAll();
        res.status(200).json(allDiets);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;