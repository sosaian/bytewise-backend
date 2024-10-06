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
        const { id: USER_ID } = req.user
        
        try {
            await TaskAuth.verifyTaskOwnership(id, USER_ID)
            
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
        const { id: USER_ID } = req.user

        try {
            await TaskAuth.verifyTaskOwnership(id, USER_ID)

            await Task.updateTask(id, description_task, status_task, due_date)
            
            res.json({ message: 'Task updated successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error updating task' })
        }
    }

    static async delete(req, res) {
        const { id } = req.params
        const { id: USER_ID } = req.user
        
        try {
            await TaskAuth.verifyTaskOwnership(id, USER_ID)

            await Task.deleteTask(id)
            
            res.json({ message: 'Task deleted successfully' })
        } catch (error) {
            res.status(500).json({ error: 'Error deleting task' })
        }
    }
}

export class TaskAuth {
    static async verifyTaskOwnership(task_id, USER_ID) {
        const TARGETED_TASK = await Task.getTaskById(task_id)
            
        if (!TARGETED_TASK) throw new Error('Task not found')

        if (TARGETED_TASK.id_user !== USER_ID) throw new Error('Invalid task ID')
    }
}
