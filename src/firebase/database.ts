import {
  child,
  DataSnapshot,
  get,
  getDatabase,
  ref,
  remove,
  set,
} from "firebase/database";
import { app } from "./firebase";
import {
  CategoryMetadata,
  Metadata,
  RecipeInfo,
  RecipeMetadata,
  RecipeType,
} from "../types/recipe";

const db = getDatabase(app);
const metadataRef = ref(db, "metadata/");

const fetchAllMetadata = async (
  type: RecipeType,
  setMetadata: (m: Metadata[]) => void,
  setLoading: (l: boolean) => void,
  setError: (e: string) => void,
  category?: string
) => {
  const metadata: Metadata[] = [];
  const path = category === undefined ? `${type}/` : `${type}/${category}`;
  const snapshot = await get(child(metadataRef, path));

  if (!snapshot.exists()) {
    setError("fetch all metadata: no data available");
  }

  snapshot.forEach((s) => {
    if (s.key !== null) {
      //recipe
      if (s.val().title !== undefined) {
        let newMetadata = new RecipeMetadata(
          s.key,
          s.val().title,
          type,
          s.val().imgURL,
        );
        metadata.push(newMetadata);
      }

      // category
      if (s.val().title === undefined) {
        const recipes: RecipeMetadata[] = [];

        s.forEach((child: any) => {
          if (child.val().title !== undefined)
            recipes.push(
              new RecipeMetadata(
                child.key,
                child.val().title,
                type,
                child.val().imgURL,
              )
            );
        });

        let newMetadata = new CategoryMetadata(s.key, type, recipes);
        metadata.push(newMetadata);
      }
    }
  });
  console.log(metadata)
  setMetadata(metadata);
  setLoading(false);
};

const fetchCategories = async (
  type: RecipeType,
  setCategories: (m: string[]) => void,
  setLoading: (l: boolean) => void,
  setError: (e: string) => void
) => {
  const categories: string[] = [];
  const snapshot = await get(child(metadataRef, `${type}/`));

  if (snapshot.exists()) {
    snapshot.forEach((s) => {
      if (s.key !== null) {
        if (s.val().title === undefined) {
          categories.push(s.key);
        }
      }
    });

    setCategories(categories);
    setLoading(false);
  } else {
    setError("fetch categories: no data available");
  }
};

const fetchRecipe = async (
  id: string,
  type: RecipeType,
  setRecipe: (r: RecipeInfo) => void,
  setLoading: (l: boolean) => void,
  setError: (e: string) => void,
  category?: string
) => {
  const path =
    category === undefined ? `${type}/${id}` : `${type}/${category}/${id}`;
  const snapshot: DataSnapshot = await get(ref(db, path));

  if (snapshot.exists()) {
    setRecipe(snapshot.val());
    console.log(snapshot.val())
    setLoading(false);
  } else {
    setError("fetch recipe: no data available");
  }
};

const storeRecipe = (recipe: RecipeInfo) => {
  // const marshalledRecipe = marshallRecipe(recipe);
  // const path =
  //   recipe.category === undefined
  //     ? `${recipe.type}/${recipe.id}`
  //     : `${recipe.type}/${recipe.category}/${recipe.id}`;
  // set(ref(db, path), {
  //   ...marshalledRecipe
  // });
  // console.log('stored recipe: ' + path);
  // updateMetadata(marshalledRecipe, path);
};

const updateMetadata = (recipe: any, path: string) => {
  set(child(metadataRef, path), {
    title: recipe.title,
    imgURL: recipe.imgURL,
  });

  console.log("updated metadata: " + path);
};

const updateRecipe = (
  recipe: RecipeInfo,
  oldType: RecipeType,
  oldRecipeID: string,
  oldCategory?: string
) => {
  storeRecipe(recipe);

  const path =
    recipe.category === undefined
      ? `${recipe.type}/${recipe.id}`
      : `${recipe.type}/${recipe.category}/${recipe.id}`;

  const oldPath =
    oldCategory === undefined
      ? `${oldType}/${oldRecipeID}`
      : `${oldType}/${oldCategory}/${oldRecipeID}`;

  if (path !== oldPath) {
    // Remove old path
    remove(ref(db, oldPath));
    remove(child(metadataRef, oldPath));
  }
};

const deleteRecipe = (recipe: RecipeInfo) => {
  const path =
    recipe.category === undefined
      ? `${recipe.type}/${recipe.id}`
      : `${recipe.type}/${recipe.category}/${recipe.id}`;
  remove(ref(db, path));
  remove(child(metadataRef, path));
};

const isOverWritingRecipe = async (recipe: RecipeInfo): Promise<boolean> => {
  const path =
    recipe.category === undefined
      ? `${recipe.type}/${recipe.id}`
      : `${recipe.type}/${recipe.category}/${recipe.id}`;

  const snapshot = await get(child(metadataRef, path));

  return snapshot.exists();
};

export {
  fetchAllMetadata,
  fetchRecipe,
  storeRecipe,
  fetchCategories,
  updateRecipe,
  deleteRecipe,
  isOverWritingRecipe,
};
