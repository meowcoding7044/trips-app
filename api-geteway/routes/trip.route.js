import express from 'express'

import {
    trips,
    trip
} from '../controllers/trip.controller.js'

const router = express.Router()

router.get('/trips', trips)
router.get('/trip', trip)

export default router