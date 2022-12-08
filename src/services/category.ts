import { ICategoryFormData } from "../store/category/Create";
import apiFactory from "../utils/api";

export function getAllCategoryService() {
  return apiFactory().get(`Category/all`);
}

export function addCategoryService(data: ICategoryFormData) {
  return apiFactory().post(`Category`, data);
}
