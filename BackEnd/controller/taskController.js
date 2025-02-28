const mongoose = require("mongoose");
const taskModel = require("../models/TaskModel");

// post
const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await taskModel.create({ title, description });
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
// to get all task
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).json(tasks);
  } catch {
    res.status(400).json({ error: e.message });
  }
};
// To get a single Task-Get
const getSingleTasks = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }
  try {
    const singleTask = await taskModel.findById(id);
    res.status(200).json(singleTask);
  } catch (e) {
    res.staus(400).json({ error: e.message });
  }
};
// To update a task-Patch

const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }
  try {
    const task = await taskModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    res.status(200).json(task);
  } catch (e) {
    res.staus(400).json({ error: e.message });
  }
};

// Delete Tsk-Delete

const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Task Not Found" });
    } try {
        const task = await taskModel.findByIdAndDelete(id);
        res.status(200).json(task)
    } catch (e) {
        res.staus(400).json({ error: e.message });
      }
}

module.exports = { createTask, getTasks, getSingleTasks, updateTask,deleteTask };
