import express from 'express'

const router = express.Router()

router.get('/api', (req, res) => {
    return res.json("Hello World!")
})

export default router