export interface IAddCategoryState {
  categoryAdded?: boolean;
  loading: boolean;
  error?: string | null;
  data?: ICategoryData | null;
  url?: string;
}

export interface ICategoryFormData {
  name: string;
}

export interface ICategoryData {
  name: string;
  categoryId?: string;
}
