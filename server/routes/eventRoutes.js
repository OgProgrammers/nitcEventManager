const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// POST /create: Create a new event
router.post('/create', eventController.createEvent);

// POST /register/:eventId: Register for an event
router.post('/register/:eventId', eventController.registerParticipant);

// GET /all: Retrieve all events
router.get('/all', eventController.getAllEvents);

// GET /:eventId: Retrieve event details
router.get('/:eventId', eventController.getEventDetails);

// DELETE /:eventId: Delete an event
router.delete('/:eventId', eventController.deleteEvent);

// PUT /update/:eventId: Update event details
router.put('/update/:eventId', eventController.updateEvent);

router.patch('/status/:eventId', eventController.approveEvent);

module.exports = router;