const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Determine the environment
const isDocker = process.env.IS_DOCKER === 'true';
const isDockerCompose = process.env.IS_DOCKER_COMPOSE === 'false';

// Define the MongoDB connection URL
let mongoUrl;

if (isDocker) {
  // When running as a separate Docker container
  mongoUrl = "mongodb://admin:09031184603@host.docker.internal:27017/todoapp";
} else if (isDockerCompose) {
  // When running as part of Docker Compose
  mongoUrl = "mongodb://admin:09031184603@mongodb:27017/todoapp";
} else {
  // When running locally
  mongoUrl = "mongodb://admin:09031184603@localhost:27017/todoapp";
}

// Connect to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin'
});

// Define a Task Schema
const taskSchema = new mongoose.Schema({
  task: String,
  status: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve CSS and JS files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// API endpoint to get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to add a new task
app.post('/api/tasks', async (req, res) => {
  const { task } = req.body;

  try {
    const newTask = new Task({ task, status: false });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to update the status of a task
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
