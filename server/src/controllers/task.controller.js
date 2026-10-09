import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Task from "../models/task.models.js";

const getTasks = asyncHandler(async (req, res) => {
  const { status, priority } = req.query;
  const filter = { user: req.user._id };

  if (status) {
    if (!["todo", "in_progress", "done"].includes(status)) {
      throw new ApiError(400, "Invalid task status");
    }
    filter.status = status;
  }

  if (priority) {
    if (!["low", "medium", "high"].includes(priority)) {
      throw new ApiError(400, "Invalid task priority");
    }
    filter.priority = priority;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (typeof title !== "string" || !title.trim()) {
    throw new ApiError(400, "Task title is required");
  }

  const task = await Task.create({
    user: req.user._id,
    title: title.trim(),
    description,
    status,
    priority,
    dueDate,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.isValidObjectId(taskId)) {
    throw new ApiError(400, "Invalid task ID");
  }

  const task = await Task.findOne({
    _id: taskId,
    user: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task fetched successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.isValidObjectId(taskId)) {
    throw new ApiError(400, "Invalid task ID");
  }

  const updates = {};
  const allowedFields = ["title", "description", "status", "priority", "dueDate"];

  for (const field of allowedFields) {
    if (Object.hasOwn(req.body, field)) {
      updates[field] = req.body[field];
    }
  }

  if (typeof updates.title === "string") {
    updates.title = updates.title.trim();

    if (!updates.title) {
      throw new ApiError(400, "Task title cannot be empty");
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "Provide at least one task field to update");
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: req.user._id },
    updates,
    { new: true, runValidators: true },
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.isValidObjectId(taskId)) {
    throw new ApiError(400, "Invalid task ID");
  }

  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task deleted successfully"));
});

export { createTask, getTasks, getTaskById, updateTask, deleteTask };