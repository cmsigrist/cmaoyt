import { RecipeInfo } from "../types/recipe";

export const createId = (title: string): string => {
  return title.toLowerCase().replace(/\W/g, '_');
};

export const parseId = (title: string): string => {
  const tokens = title.split('_');
  const capitalized = tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1));
  return capitalized.join(' ');
};

// Keep undefined fields only
export const marshallRecipe = (recipe: RecipeInfo): any => {
  const marshalledRecipe: any = {
    id: recipe.id,
    title: recipe.title,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation,
    yield: recipe.yield,
    preparationTime: recipe.preparationTime,
    type: recipe.type,
    imgURL: recipe.imgURL
  };

  if (recipe.ovenTemperature !== undefined) {
    marshalledRecipe.ovenTemperature = recipe.ovenTemperature
  }
  if (recipe.quote !== undefined) {
    marshalledRecipe.quote = recipe.quote
    
  }
  if (recipe.source !== undefined) {
    marshalledRecipe.source = recipe.source
  }
  if (recipe.category !== undefined) {
    marshalledRecipe.category = recipe.category
    
  }

  return marshalledRecipe;
};