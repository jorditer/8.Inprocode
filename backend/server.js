import mongoose, { Schema, Document } from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import eventRoutes from './routes/event.route.js';
// import { default as Event } from './models/events.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Allows us to accept JSON data in the req.body

app.use("/api/home", eventRoutes); // every route will be appending to /api/home


const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error('MONGO_URL is not defined in the environment variables');
}

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log('Server started on http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Connection error', error);
    }) ;