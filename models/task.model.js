const { DataTypes } = require('sequelize');
const { sq } = require('../config/database');

const Task = sq.define('Task', {
    taskId: {                      // primary key
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
        allowNull: false,
        defaultValue: 'To Do',
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Projects', // name of the table in the database
            key: 'projectId', // primary key in the `Projects` table
        },
        onDelete: 'CASCADE', // automatically delete tasks if the project is deleted
        onUpdate: 'CASCADE', // update `ProjectId` if the associated project's ID changes
    },
});

module.exports = Task;
