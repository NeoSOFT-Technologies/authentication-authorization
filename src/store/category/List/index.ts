export interface IListCategoryState {
  loading: boolean;
  error?: string | null;
  data?: ICategoryData | null;
  message?: string;
}

export interface ICategoryData {
  categoryId?: string;
  name: string;
}
