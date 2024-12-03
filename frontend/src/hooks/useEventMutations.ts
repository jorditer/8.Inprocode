import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConcertEvent } from '../types/ConcertEvent';

export const useEventMutations = () => {
  const queryClient = useQueryClient();

  const updateEvent = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Event> }) => {
      const response = await fetch(`/api/home/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update event');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });
  
  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/home/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete event');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });
  
   const createEvent = useMutation({
    mutationFn: async (newEvent: Omit<ConcertEvent, '_id'>) => {
      const response = await fetch('/api/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      if (!response.ok) throw new Error('Failed to create event');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    }
  });

  return { updateEvent, deleteEvent, createEvent };
};