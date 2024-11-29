import mongoose from "mongoose";
import Event from "../models/events.model.js";
import express from "express";

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Server is ready');
// });

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const events = await Event.find({}); // An empty object means return all the objects in the database
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
	const {id} = req.params; //whatever is after the / in the URL, :id can have any name but it has to match the name in const {id} 
	console.log(`id: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
	try {
		const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, message: 'Event deleted' });
	} catch (error) {
        res.status(404).json({ success: true, message: 'Event not found' });
		console.error(error);
	}
});

router.post('/', async (req, res) => {
    const event = req.body;
    console.log(event);
    if (!event || !event.name || !event.date) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const newEvent = new Event(event);

    try {
        await newEvent.save();
        res.status(201).json({ success: true, data: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const event = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid ID' });
    }
    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, event, {new: true}) // new: true returns the updated object, if not set it returns the old one
        res.status(200).json({ success: true, data: updatedEvent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error``' });
    }
})
 
export default router; // test