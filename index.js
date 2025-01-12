// Import necessary libraries
const express = require('express');
const dotenv = require('dotenv');
const { sq,testDbConnection } = require('./config/database');
const db = require('./models/index');
const userRoutes = require('./routes/user.route');
const taskRoutes = require('./routes/task.route');
const projectRoutes = require('./routes/project.route');

dotenv.config();

// Initialize Express and required Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Database connection
testDbConnection()

// Define Relationships
db.User.belongsToMany(db.Project, { through: 'UserProjects',foreignKey: 'UserId' });
db.Project.belongsToMany(db.User, { through: 'UserProjects', foreignKey: 'ProjectId' });
db.Project.hasMany(db.Task, { foreignKey: 'projectId' });
db.Task.belongsTo(db.Project, { foreignKey: 'projectId' });

// testing render deployment
app.get("/", (req, res) => res.send("Express on Render"));

// register routes
app.use('/api', userRoutes)
app.use('/api', projectRoutes)
app.use('/api', taskRoutes)

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

(async () => {
  try {
    await sq.sync();  // { force: true }
    console.log('Database synced');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
      // console.log(Object.keys(db.Project.prototype)); // Should list addUser

    });
  } 
  catch (error) {
    console.error('Unable to start server:', error);
  }
})();


