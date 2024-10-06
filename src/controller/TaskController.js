import Task from '../models/Task.js'

export class TaskController {
    static async create(req, res) {
        const { id_user, description_task, status_task, due_date } = req.body
        try {
            const taskId = await Task.createTask(id_user, description_task, status_task, due_date)
            res.status(201).json({ id: taskId })
        } catch (error) {
            res.status(500).json({ error: 'Error creating task' })
        }
    }

    static async get(req, res) {
        const { id } = req.params
        try {
            const task = await Task.getTaskById(id)
            if (task) {
                res.json(task)
            } else {
                res.status(404).json({ error: 'Task not found' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching task' })
        }
    }

    static async update(req, res) {
        const { id } = req.params
        const { description_task, status_task, due_date } = req.body
        try {
            await Task.updateTask(id, description_task, status_task, due_date)
            res.json({ message: 'Task updated successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error updating task' })
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        try {
            await Task.deleteTask(id)
            res.json({ message: 'Task deleted successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error deleting task' })
        }
    }
}
