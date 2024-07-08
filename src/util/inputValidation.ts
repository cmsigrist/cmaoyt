import { RecipeInfo, TimeType, YieldType, newTime, newYield } from "../types/recipe";

export const isEmpty = (validations: Map<string, string>): boolean => {
  return Array.from(validations.values()).filter((v) => v !== '').length === 0;
};

export const initChecks = (): Map<string, string> => {
  const newInvalidInputs = new Map<string, string>();
  newInvalidInputs.set('title', 'Error: title cannot be empty');
  newInvalidInputs.set('ingredients', 'Error: ingredients cannot be empty');
  newInvalidInputs.set('preparation', 'Error: preparation cannot be empty');
  newInvalidInputs.set('yield', 'Error: yield cannot be empty');
  newInvalidInputs.set('preparationTime', 'Error: preparation time cannot be empty');
  return newInvalidInputs;
};

export const checkTitle = (
  invalidInputs: Map<string, string>,
  input: string
): Map<string, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input !== '') {
    newInvalidInputs.set('title', '');
  } else {
    newInvalidInputs.set('title', 'Error: title cannot be empty');
  }
  return newInvalidInputs;
};

export const checkIngredients = (
  invalidInputs: Map<string, string>,
  input: string[]
): Map<string, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input.length !== 0) {
    newInvalidInputs.set('ingredients', '');
  } else {
    newInvalidInputs.set('ingredients', 'Error: ingredients cannot be empty');
  }
  return newInvalidInputs;
};

export const checkPreparation = (
  invalidInputs: Map<string, string>,
  input: string[]
): Map<string, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input.length !== 0) {
    newInvalidInputs.set('preparation', '');
  } else {
    newInvalidInputs.set('preparation', 'Error: preparation cannot be empty');
  }
  return newInvalidInputs;
};

export const checkYield = (
  invalidInputs: Map<string, string>,
  input: YieldType
): Map<string, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input !== newYield) {
    newInvalidInputs.set('yield', '');
  } else {
    newInvalidInputs.set('yield', 'Error: yield cannot be empty');
  }
  return newInvalidInputs;
};

export const checkPreparationTime = (
  invalidInputs: Map<string, string>,
  input: TimeType
): Map<string, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input !== newTime) {
    newInvalidInputs.set('preparationTime', '');
  } else {
    newInvalidInputs.set('preparationTime', 'Error: preparation time cannot be empty');
  }
  return newInvalidInputs;
};

export const checkAllInputs = (
  invalidInputs: Map<string, string>,
  recipe: RecipeInfo
): Map<string, string> => {
  let newInvalidInputs = new Map(invalidInputs);
  newInvalidInputs = checkTitle(newInvalidInputs, recipe.title);
  newInvalidInputs = checkIngredients(newInvalidInputs, recipe.ingredients);
  newInvalidInputs = checkPreparation(newInvalidInputs, recipe.preparation);
  newInvalidInputs = checkYield(newInvalidInputs, recipe.yield);
  newInvalidInputs = checkPreparationTime(newInvalidInputs, recipe.preparationTime);

  return newInvalidInputs;
};
