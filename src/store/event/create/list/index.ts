export interface IListEventState {
  loading: boolean;
  message?: string;
  error?: string | null;
  data?: IEventData | null;
  url?: string;
}
export interface IEventData {
  eventId?: string;
  name: string;
  date: string;
  imageUrl: string;
}
