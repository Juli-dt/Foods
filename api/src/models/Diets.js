const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Diets = sequelize.define('diets', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Diets;
};
