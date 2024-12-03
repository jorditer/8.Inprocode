export interface ConcertEvent {
	_id: string;
	name: string;
	location: string;
	price: number;
	date: string;
	description: string;
  }
  export interface ApiResponse {
	success: boolean;
	data: ConcertEvent[];
  }
