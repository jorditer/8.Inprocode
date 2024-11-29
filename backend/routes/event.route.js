import express from "express";
import { getEvent, deleteEvent, postEvent, updateEvent } from "../controllers/product.controller.js";

const router = express.Router();

router.use(express.json());
router.get('/', getEvent);
router.delete('/:id', deleteEvent);
router.post('/', postEvent);
router.put('/:id', updateEvent)
 
export default router; // test