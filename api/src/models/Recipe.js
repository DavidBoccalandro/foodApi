const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("recipe", {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		spoonacularScore: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		healthScore: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		analizedInstructions: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		fromDb: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	});
};
