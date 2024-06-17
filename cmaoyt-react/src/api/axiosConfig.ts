import axios from 'axios';
import { RecipeType } from '../types/recipe';

export const api = (type: RecipeType) =>
  axios.create({ baseURL: `http://localhost:8000/${type}` });

export const api_recipe = (type: RecipeType, category?: string) => {
  const url = category !== undefined ? `category/${category}` : '';
  return axios.create({ baseURL: `http://localhost:8000/${type}/${url}` });
};
