import mongoose from "mongoose";

const EventSchema =  new mongoose.Schema({
  // Create a new schema, returns an object
  name: { type: String, required: [true, "Please add a name"] }, // name property, type string, required
  image: { type: String, required: false },
  category: { type: String, required: false },
  description: { type: String, required: false },
  price: { type: Number, required: true, default: 0 },
  date: { type: Date, required: true },
},
{
	  timestamps: true, // createdAt, updated
}
);

const Event = mongoose.model("Event", EventSchema); // Create a model from the schema

export default Event;