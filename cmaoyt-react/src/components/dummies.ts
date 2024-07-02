import { Metadata, RecipeInfo, RecipeType } from "../types/recipe";
import dummyLogo from "../assets/espresso_cookies.jpg";

export const dummy: RecipeInfo = {
  id: "1",
  title: "Cookies",
  ingredients: ["100g of butter", "200g of white sugar", "300g of chocolate"],
  preparation: [
    "Melt the butter",
    "Mix everything",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  yield: { quantity: 24, piece: "pieces" },
  preparationTime: { time: 60, unit: "min" },
  ovenTemperature: 200,
  quote: {
    content: "Hi, the best cookies post hangover",
    author: "me, and chief or captain",
  },
  source: { content: "Some child's book", author: "me" },
  imgURL: dummyLogo,
  type: RecipeType.Desserts,
  category: "More cookies",
  language: "en",
};

export const dummies: Metadata[] = [
  {
    id: "0",
    title: "Hello there",
    imgURL: "../assets/espresso_cookies.jpg",
    type: RecipeType.Desserts,
  } as Metadata,
  {
    id: "1",
    title: "Cookies",
    imgURL: "../assets/espresso_cookies.jpg",
    type: RecipeType.Desserts,
  } as Metadata,
  {
    id: "2",
    title: "Cookies",
    imgURL: "../assets/espresso_cookies.jpg",
    type: RecipeType.Desserts,
  } as Metadata,
  {
    title: "Category",
    imgURL: "../assets/espresso_cookies.jpg",
    type: RecipeType.Desserts,
    category: "More cookies",
    recipes: [
      {
        id: "0",
        title: "Hello there",
        imgURL: "../assets/espresso_cookies.jpg",
        type: RecipeType.Desserts,
      },
    ],
  } as Metadata,
];
