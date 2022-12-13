import { IEventFormData } from "../store/event/create";
import apiFactory from "../utils/api";

export function getAllEventService() {
  return apiFactory().get(`Events`);
}

export function addEventService(data: IEventFormData) {
  return apiFactory().post(`Events`, data);
}
export function updateEventService(data: IEventFormData) {
  return apiFactory().put(`Events`, data);
}
export function getEventByIdService(Id: string) {
  return apiFactory().get(`Events/` + Id);
}
export function deleteEventService(Id: any) {
  return apiFactory().post(`Events/` + Id);
}
