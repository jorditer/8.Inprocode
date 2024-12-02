import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setEvents } from '../store/eventSlice';
import type { Event, ApiResponse } from '../types/event';

export const useEvents = () => {
  const dispatch = useDispatch();
  
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/home');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { success, data }: ApiResponse = await response.json();
        if (!success) {
          throw new Error('API returned unsuccessful response');
        }
        dispatch(setEvents(data));
        return data;
      } catch (error) {
        throw new Error('Failed to fetch events');
      }
    }
  });
};