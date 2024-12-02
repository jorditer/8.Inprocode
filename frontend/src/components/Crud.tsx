// components/Crud.tsx
import { useEvents } from '../hooks/useEvents.ts';
import { Event } from '../types/event';

const Crud = () => {
  const { data: events, isLoading, error } = useEvents();
	console.log(event)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Events</h1>
      {events?.map((event: Event) => (
        <div key={event._id} className="p-4 border rounded">
          <h2>{event.name}</h2>
          <p>Location: {event.location}</p>
          <p>Price: ${event.price}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Crud;