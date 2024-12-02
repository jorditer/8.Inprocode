export interface Event {
	_id: string;
	name: string;
	location: string;
	description: string;
	price: number;
	date: string;
  }
  export interface ApiResponse {
	success: boolean;
	data: Event[];
  }
