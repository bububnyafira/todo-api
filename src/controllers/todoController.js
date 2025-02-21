const Todo = require("../models/todoModel");

// Get all to-do posts
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single to-do post by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "To-do post not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new to-do post
exports.createTodo = async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a to-do post
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: "To-do post not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a to-do post
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "To-do post not found" });
    }

    await Todo.findByIdAndDelete(id);
    return res.status(200).json({ message: "To-do deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
