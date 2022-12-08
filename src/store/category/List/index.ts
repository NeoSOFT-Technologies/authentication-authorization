export interface IListCategoryState {
  loading: boolean;
  message?: string;
  error?: string | null;
  data?: ICategoryData | null;
}

export interface ICategoryData {
  categoryId?: string;
  name: string;
}
