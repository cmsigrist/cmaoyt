import {
  RecipeInfo,
  TimeType,
  YieldType,
  newTime,
  newYield,
} from "../types/recipe";

export type InputValidation =
  | "title"
  | "ingredients"
  | "preparation"
  | "yield"
  | "preparationTime";

export const isEmpty = (validations: Map<InputValidation, string>): boolean => {
  return Array.from(validations.values()).filter((v) => v !== "").length === 0;
};

export const initChecks = (): Map<InputValidation, string> => {
  const newInvalidInputs = new Map<InputValidation, string>();
  newInvalidInputs.set("title", "");
  newInvalidInputs.set("ingredients", "");
  newInvalidInputs.set("preparation", "");
  newInvalidInputs.set("yield", "");
  newInvalidInputs.set("preparationTime", "");
  return newInvalidInputs;
};

export const checkTitle = (
  invalidInputs: Map<InputValidation, string>,
  input: string
): Map<InputValidation, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input !== "") {
    newInvalidInputs.set("title", "");
  } else {
    newInvalidInputs.set("title", "Error: title cannot be empty");
  }
  return newInvalidInputs;
};

export const checkList = (
  key: InputValidation,
  error: string,
  invalidInputs: Map<InputValidation, string>,
  input: string[]
): Map<InputValidation, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input.length !== 0 && input.filter((i) => i === "").length === 0) {
    newInvalidInputs.set(key, "");
  } else {
    newInvalidInputs.set(key, error);
  }
  return newInvalidInputs;
};

export const checkYield = (
  invalidInputs: Map<InputValidation, string>,
  input: YieldType
): Map<InputValidation, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input.quantity === 0 && (input.piece === "people" || input.piece !== "")) {
    newInvalidInputs.set("yield", "Error: yield cannot be empty");
  } else if(input.quantity === 0 && input.piece === "") {
    newInvalidInputs.set("yield", "Error: yield quantity and serving cannot be empty");
  } else if (input.piece === "") {
    newInvalidInputs.set("yield", "Error: yield serving cannot be empty");
  } else {
    newInvalidInputs.set("yield", "");
  }
  return newInvalidInputs;
};

export const checkPreparationTime = (
  invalidInputs: Map<InputValidation, string>,
  input: TimeType
): Map<InputValidation, string> => {
  const newInvalidInputs = new Map(invalidInputs);
  if (input !== newTime) {
    newInvalidInputs.set("preparationTime", "");
  } else {
    newInvalidInputs.set(
      "preparationTime",
      "Error: preparation time cannot be empty"
    );
  }
  return newInvalidInputs;
};

export const checkAllInputs = (
  invalidInputs: Map<InputValidation, string>,
  recipe: RecipeInfo
): Map<InputValidation, string> => {
  console.log(recipe);
  let newInvalidInputs = new Map(invalidInputs);
  newInvalidInputs = checkTitle(newInvalidInputs, recipe.title);
  newInvalidInputs = checkList(
    "ingredients",
    "Error: ingredients cannot be empty",
    newInvalidInputs,
    recipe.ingredients
  );
  newInvalidInputs = checkList(
    "preparation",
    "Error: preparation cannot be empty",
    newInvalidInputs,
    recipe.preparation
  );
  newInvalidInputs = checkYield(newInvalidInputs, recipe.yield);
  newInvalidInputs = checkPreparationTime(
    newInvalidInputs,
    recipe.preparationTime
  );

  return newInvalidInputs;
};
