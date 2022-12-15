import { IEventFormData } from "../store/event/create";
import { IEventUpdateData } from "../store/event/update";
import apiFactory from "../utils/api";

export function getAllEventService() {
  return apiFactory().get(`Events`);
}

export function addEventService(data: IEventFormData) {
  return apiFactory().post(`Events`, data);
}
export function updateEventService(data: IEventUpdateData) {
  return apiFactory().put(`Events`, data);
}
export function getEventByIdService(Id: string) {
  return apiFactory().get(`Events/` + Id);
}
export function deleteEventService(Id: string) {
  return apiFactory().delete(`Events/` + Id);
}
