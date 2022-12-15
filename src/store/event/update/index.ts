export interface IUpdatedEventState {
  eventUpdated?: boolean;
  loading?: boolean;
  error?: boolean | null;
  data?: IEventUpdateData | null;
  url?: string;
}

export interface IEventUpdateData {
  eventId: string;
  name: string;
  price: number;
  artist: string;
  description: string;
  date: string;
  imageurl: string;
  categoryId: string;
}

// export interface IEventData {
//   eventId?: string;
// }
