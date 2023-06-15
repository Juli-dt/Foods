require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leer todos los archivos de la carpeta "models", requerirlos y agregarlos al arreglo "modelDefiners"
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.endsWith('.js') && file !== basename)
  .forEach((file) => {
    const model = require(path.join(__dirname, '/models', file))(sequelize);
    modelDefiners.push(model);
  });

// Asociar los modelos si tienen una función "associate"
modelDefiners.forEach((model) => {
  if (model.associate) {
    model.associate(modelDefiners);
  }
});

// Obtener los modelos
const recipeModel = require('./models/Recipe');
const dietsModel = require('./models/Diets');

const recipe = recipeModel(sequelize);
const diets = dietsModel(sequelize);

// Aca vendrian las relaciones
recipe.belongsToMany(diets, { through: 'DietsRecipes' });
diets.belongsToMany(recipe, { through: 'DietsRecipes' });

module.exports = {
  recipe,
  diets,
  conn: sequelize,
};
