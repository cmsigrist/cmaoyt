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
  type;
  title;
  constructor(title: string, type: RecipeType) {
    this.title = title
    this.type = type;
  }

  get getTitle() {
    return this.title
  }

  get getType() {
    return this.type;
  }
}

export class RecipeMetadata extends Metadata {
  id;
  imgURL;

  constructor(id: string, title: string, type: RecipeType, imgURL: string) {
    super(title, type);
    this.id = id;
    this.imgURL = imgURL;
  }

  get getId() {
    return this.id;
  }

  get getImgURL() {
    return this.imgURL;
  }
}

export class CategoryMetadata extends Metadata {
  recipes;

  constructor(title: string, type: RecipeType, recipes: RecipeMetadata[]) {
    super(title, type);
    this.recipes = recipes;
  }

  get getRecipes() {
    return this.recipes;
  }
}

export type RecipeList = {
  ids: string[];
};

// export const emptyIngredient: Ingredient = { quantity: '', unit: '', name: '' };
export const emptyTime: TimeType = { time: 0, unit: "min" };
export const emptyYield: YieldType = { quantity: 0, piece: "people" };
export const emptyQuote: QuoteType = { content: "", author: "" };
export const emptyRecipe: RecipeInfo = {
  id: "",
  title: "",
  ingredients: [],
  preparation: [],
  yield: emptyYield,
  preparationTime: emptyTime,
  ovenTemperature: undefined,
  quote: undefined,
  type: RecipeType.Desserts,
  source: undefined,
  imgURL: "",
  category: undefined,
  language: undefined,
};
