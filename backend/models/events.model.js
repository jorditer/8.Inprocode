import mongoose from "mongoose";

const EventSchema =  new mongoose.Schema({
  // Create a new schema, returns an object
  name: { type: String, required: [true, "Please add a name"] }, // name property, type string, required
  // image: { type: String, required: false },
  location: {type: String, required: true},
  // genre: { type: String, required: false },
  description: { type: String, required: false, default: "" }, // if not provided, default to empty string
  price: { type: Number, required: true},
  date: { type: Date, required: true },
},
{
	  timestamps: true, // createdAt, updated
}
);

const Event = mongoose.model("Event", EventSchema); // Create a model from the schema

export default Event;
/*
[
{name: "Muchachito", location: "Salamandra", description: "Description 1", price: 20, date: "2022-01-01"},
{name: "Sunny Girls", location: "Taro", description: "Post perreo a las 10", price: 10, date: "2022-02-02"},
]
*/