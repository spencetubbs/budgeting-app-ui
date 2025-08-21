import { api } from "./app.api"
import type { Category } from "../types/category.type";


export const getAllCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/category')
  return data as Category[];
}
