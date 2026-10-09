import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All task routes require authentication
router.use(verifyJWT);

router.route("/")
  .get(getTasks)
  .post(createTask);

router.route("/:taskId")
  .get(getTaskById)
  .patch(updateTask)
  .delete(deleteTask);

export default router;