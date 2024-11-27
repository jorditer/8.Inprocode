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

app.delete('/api/home/:id', async (req, res) => {
	const {id} = req.params;
	console.log(`id: ${id}`);
	try {
		await Event.findByIdAndDelete(id);
	} catch (error) {
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