import { RecipeType } from './types/recipe';

export const ROUTE_HOME = '/';
export const ROUTE_REGISTER = '/register';
export const ROUTE_PASSWORD_RESET = '/password_reset';
export const ROUTE_LOGGED = '/logged';
export const ROUTE_SETTINGS = '/settings';
export const ROUTE_FORBIDDEN = '/403';

export const ROUTE_RECIPE = (
  type: RecipeType,
  recipeID: string,
  category?: string
) =>
  category === undefined
    ? `/${type}/${recipeID}`
    : `/${type}/category/${category}/${recipeID}`;
export const ROUTE_CATEGORY = (type: RecipeType, category: string) =>
  `/${type}/category/${category}`;

export const ROUTE_DESSERTS = `/${RecipeType.Desserts}`;
export const ROUTE_MEALS = `/${RecipeType.Meals}`;
export const ROUTE_DRINKS = `/${RecipeType.Drinks}`;

export const ROUTE_RECIPE_NEW = '/recipe/new/';
export const ROUTE_EDIT_RECIPE = (
  type: RecipeType,
  recipeID: string,
  category?: string
) =>
  category === undefined
    ? `/edit/${type}/${recipeID}`
    : `/edit/${type}/category/${category}/${recipeID}`;
