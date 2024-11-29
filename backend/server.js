import mongoose, { Schema, Document } from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import { default as Event } from './models/events.model.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use(express.json()); // Allows us to accept JSON data in the req.body

app.get('/api/home', async (req, res) => {
    try {
        const events = await Event.find({}); // An empty object means return all the objects in the database
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.delete('/api/home/:id', async (req, res) => {
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

app.post('/api/home', async (req, res) => {
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

app.put('/api/home/:id', async (req, res) => {
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

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined in the environment variables');
}

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(3000, () => {
            console.log('Server started on http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Connection error', error);
    });