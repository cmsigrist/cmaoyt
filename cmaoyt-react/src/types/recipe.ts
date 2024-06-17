import { Language } from './language';

export enum RecipeType {
  Desserts = 'desserts',
  Meals = 'meals',
  Drinks = 'drinks',
}

export const allRecipeTypes = [
  RecipeType.Desserts,
  RecipeType.Meals,
  RecipeType.Drinks,
];

// export type Ingredient = {
//   quantity: string;
//   unit: string;
//   name: string;
// };

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

export type RecipeMetadata = Metadata & {
  id: string;
};

export type CategoryMetadata = Metadata & {
  category: string;
};

export type Metadata = {
  title: string;
  imgURL: string;
  type: RecipeType;
  recipes?: RecipeMetadata[];
};

export type DatabaseMetadata = {
  title: string;
  imgURL?: string;
};

export type RecipeList = {
  ids: string[];
};

// export const emptyIngredient: Ingredient = { quantity: '', unit: '', name: '' };
export const emptyTime: TimeType = { time: 0, unit: 'min' };
export const emptyYield: YieldType = { quantity: 0, piece: 'people' };
export const emptyQuote: QuoteType = { content: '', author: '' };
export const emptyRecipe: RecipeInfo = {
  id: '',
  title: '',
  ingredients: [],
  preparation: [],
  yield: emptyYield,
  preparationTime: emptyTime,
  ovenTemperature: undefined,
  quote: undefined,
  type: RecipeType.Desserts,
  source: undefined,
  imgURL: '',
  category: undefined,
  language: undefined,
};
