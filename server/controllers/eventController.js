const Event = require('../models/Event.js');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, category} = req.body;

    // Basic input validation
    if (!title || !description || !date || !time || !venue || !category) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    const event = new Event({ 
      title, 
      description, 
      date, 
      time, 
      venue, 
      category
    });
    await event.save();
    res.status(201).send({ message: 'Event created successfully', event });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error creating event' });
  }
};

exports.registerParticipant = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { studentId, name, email, department, year } = req.body;

    // Basic input validation for participant
    if (!studentId || !name || !email || !department || !year) {
      return res.status(400).send({ error: 'Missing required participant details' });
    }

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).send({ error: 'Event not found' });
    if (event.capacity <= 0) return res.status(400).send({ error: 'Event is full' });

    // Register the participant
    event.capacity -= 1;
    event.participants.push({ studentId, name, email, department, year });
    await event.save();
    res.status(200).send({ message: 'Registered successfully', event });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error registering for the event' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error fetching events' });
  }
};

exports.getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).send({ error: 'Event not found' });
    res.status(200).send(event);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error fetching event details' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) return res.status(404).send({ error: 'Event not found' });
    res.status(200).send({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error deleting event' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedData = req.body;

    // Basic input validation for updated data
    if (!updatedData.title || !updatedData.description || !updatedData.date || !updatedData.time || 
        !updatedData.venue || !updatedData.category) {
      return res.status(400).send({ error: 'Missing required fields for update' });
    }

    const event = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
    if (!event) return res.status(404).send({ error: 'Event not found' });
    res.status(200).send({ message: 'Event updated successfully', event });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error updating event' });
  }
};

exports.approveEvent = async (req, res) => {
  const { eventId } = req.params; // Extract eventId from route parameters
  const { status } = req.body; // Extract status from request body

  // Validate input
  if (!status) {
      return res.status(400).json({
          success: false,
          message: "Status is required.",
      });
  }

  try {
      // Update the event status in the database
      const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          { status: status },
          { new: true } // Return the updated document
      );

      if (!updatedEvent) {
          return res.status(404).json({
              success: false,
              message: "Event not found.",
          });
      }

      return res.status(200).json({
          success: true,
          message: "Event status updated successfully.",
          updatedEvent: updatedEvent,
      });
  } catch (error) {
      console.error("Error updating event status:", error);
      return res.status(500).json({
          success: false,
          message: "Failed to update event status.",
          error: error.message,
      });
  }
};
