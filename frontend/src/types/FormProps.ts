import { ConcertEvent } from './ConcertEvent';

export interface FormProps {
	newEvent: Omit<ConcertEvent, '_id'>;
	setNewEvent: React.Dispatch<React.SetStateAction<Omit<ConcertEvent, '_id'>>>;
	handleShowForm: (show: boolean) => void;
	handleCreate: () => Promise<void>;
  }