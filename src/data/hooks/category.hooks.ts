import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/category.api";
import type { Category } from "../types/category.type";


export const useCategories = () => {
  const query = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  return query;
};
