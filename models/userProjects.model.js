
const { DataTypes } = require('sequelize');
const { sq } = require('../config/database')

const UserProjects = sq.define('UserProjects', {
    userProjectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'userId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Projects',
            key: 'projectId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
});

module.exports = UserProjects