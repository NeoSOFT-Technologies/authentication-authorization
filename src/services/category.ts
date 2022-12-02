import { ICategoryFormData } from "../store/category";
import apiFactory from "../utils/api";

export function apiListService() {
  return apiFactory().get(`Category/all`);
}

export function addCategoryService(data: ICategoryFormData) {
  return apiFactory().post(`Category`, data);
}
