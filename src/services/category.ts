// import { IApiFormData } from "../../../store/features/gateway/api/create";
// import { IGetApiByIdData } from "../../../store/features/gateway/api/update";
import apiFactory from "../utils/api";

export function apiListService() {
  return apiFactory().get(`Category/all`);
}
