const { DataTypes } = require('sequelize');
const { sq } = require('../config/database')

const Project = sq.define('Project', {
    projectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Project