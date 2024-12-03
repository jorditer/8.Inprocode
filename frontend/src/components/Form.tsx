const Form = ({newEvent, setNewEvent, handleCreate, setShowForm}) => {
	const formatDateForInput = (isoString: string) => {
		const date = new Date(isoString);
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
	};
	return (
		<div className="mb-6 lg:space-x-2 p-4 border rounded">
			<input
				type="text"
				placeholder="Name"
				value={newEvent.name}
				onChange={e => setNewEvent({...newEvent, name: e.target.value})}
				className="mb-2 p-2 border rounded"
			/>
			<input
				type="text"
				placeholder="Location"
				value={newEvent.location}
				onChange={e => setNewEvent({...newEvent, location: e.target.value})}
				className="mb-2 p-2 border rounded"
			/>
			<input
				type="number"
				placeholder="Price"
				value={newEvent.price}
				onChange={e => setNewEvent({...newEvent, price: Number(e.target.value)})}
				className="mb-2 p-2 border rounded"
			/>
<input
  type="datetime-local"
  value={formatDateForInput(newEvent.date)}
  onChange={e => {
    const date = new Date(e.target.value);
    const isoString = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ).toISOString();
    setNewEvent({...newEvent, date: isoString});
  }}
  className="mb-2 p-2 border rounded"
  step="60" // Prevents seconds from showing
/>
			<div>
				<button 
					onClick={handleCreate}
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
				>
					Save
				</button>
				<button 
					onClick={() => setShowForm(false)}
					className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
				>
					Cancel
				</button>
			</div>
		</div>
	)
}


export default Form;