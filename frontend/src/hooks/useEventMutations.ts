import { useMutation, useQueryClient } from '@tanstack/react-query';

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

  return { updateEvent };
};