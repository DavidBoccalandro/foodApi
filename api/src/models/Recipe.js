const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("recipe", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: true,
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
