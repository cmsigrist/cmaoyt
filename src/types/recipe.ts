import { Language } from "./language";

export enum RecipeType {
  Desserts = "desserts",
  Meals = "meals",
  Drinks = "drinks",
}

export const allRecipeTypes = [
  RecipeType.Desserts,
  RecipeType.Meals,
  RecipeType.Drinks,
];

export type YieldType = { quantity: number; piece: string };

export type TimeType = { time: number; unit: string };

export type QuoteType = { content: string; author: string };

export type RecipeInfo = {
  id: string;
  title: string;
  ingredients: string[];
  preparation: string[];
  yield: YieldType;
  preparationTime: TimeType;
  ovenTemperature?: number;
  quote?: QuoteType;
  source?: QuoteType;
  imgURL: string;
  type: RecipeType;
  category?: string;
  language?: Language;
};

export class Metadata {
  id;
  type;
  title;
  constructor(id: string, title: string, type: RecipeType) {
    this.id = id;
    this.title = title;
    this.type = type;
  }
}

export class RecipeMetadata extends Metadata {
  imgURL;
  category;

  constructor(
    id: string,
    title: string,
    type: RecipeType,
    imgURL: string,
    category?: string
  ) {
    super(id, title, type);
    this.id = id;
    this.imgURL = imgURL;
    this.category = category;
  }
}

export class CategoryMetadata extends Metadata {
  recipes;

  constructor(id: string, title: string, type: RecipeType, recipes: RecipeMetadata[]) {
    super(id, title, type);
    this.recipes = recipes;
  }
}

export type RecipeList = {
  ids: string[];
};

export const newYield: YieldType = { quantity: 0, piece: "people" };
export const newTime: TimeType = { time: 0, unit: "min" };
export const newRecipe: RecipeInfo = {
  id: "",
  title: "Recipe title",
  ingredients: [],
  preparation: [],
  yield: newYield,
  preparationTime: newTime,
  ovenTemperature: undefined,
  quote: undefined,
  type: RecipeType.Desserts,
  source: undefined,
  imgURL: "",
  category: undefined,
  language: undefined,
};