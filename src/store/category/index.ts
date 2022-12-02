export interface IAddCategoryState {
  categoryAdded?: boolean;
  loading: boolean;
  error?: string | null;
  data?: ICategoryData | null;
}

export interface ICategoryFormData {
  name: string;
}

export interface ICategoryData {
  name: string;
  categoryId?: string;
}
