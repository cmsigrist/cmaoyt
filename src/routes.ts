import { RecipeType } from './types/recipe';
import { createId } from './util/marshal';

export const ROUTE_HOME = '/';
export const ROUTE_REGISTER = '/register';
export const ROUTE_PASSWORD_RESET = '/password_reset';
export const ROUTE_LOGGED = '/logged';
export const ROUTE_SETTINGS = '/settings';
export const ROUTE_FORBIDDEN = '/403';

export const ROUTE_RECIPE = (
  type: RecipeType,
  recipeId: string,
  categoryId?: string
) =>
  categoryId === undefined
    ? `/${type}/${recipeId}`
    : `/${type}/category/${categoryId}/${recipeId}`;
export const ROUTE_CATEGORY = (type: RecipeType, categoryId: string) =>
  `/${type}/category/${categoryId}`;

export const ROUTE_PAGE = (type: RecipeType) => {
  switch(type) {
    case RecipeType.Desserts: return ROUTE_DESSERTS
    case RecipeType.Meals: return ROUTE_MEALS
    case RecipeType.Drinks: return ROUTE_DRINKS
  }
}
export const ROUTE_DESSERTS = `/${RecipeType.Desserts}`;
export const ROUTE_MEALS = `/${RecipeType.Meals}`;
export const ROUTE_DRINKS = `/${RecipeType.Drinks}`;

export const ROUTE_RECIPE_NEW = '/recipe/new/';
export const ROUTE_EDIT_RECIPE = (
  type: RecipeType,
  recipeId: string,
  category?: string
) =>
  category === undefined
    ? `/edit/${type}/${recipeId}`
    : `/edit/${type}/category/${createId(category)}/${recipeId}`;
