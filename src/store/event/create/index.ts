export interface IAddEventState {
  eventAdded?: boolean;
  loading: boolean;
  error?: string | null;
  data?: IEventData | null;
  url?: string;
}

export interface IEventFormData {
  name: string;
  price: number;
  artist: string;
  description: string;
  // date: string;
  imageurl: string;
  categoryId: string;
  date: Date;
}

export interface IEventData {
  eventId?: string;
}
