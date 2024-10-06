import express from "express";
import TaskController from '../controller/taskController.js'

const router = express.Router();

router.post('/api/task', TaskController.create);
router.get('/api/task/:id', TaskController.get);
router.put('/api/task/:id', TaskController.update);
router.delete('/api/task/:id', TaskController.delete);

export default router;