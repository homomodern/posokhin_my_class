import express from 'express'
import { lessonsController } from '../controller/lessonsController.js'

const router = express.Router()

router.get('/lessons', lessonsController)

export default router