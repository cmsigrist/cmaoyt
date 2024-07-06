import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  StorageReference,
  uploadBytesResumable,
  UploadTask
} from 'firebase/storage';
import { app } from './firebase';
import { RecipeInfo } from '../types/recipe';

// const storage = getStorage(app);

// const uploadImage = (
//   img: any,
//   recipe: RecipeInfo,
//   setRecipe: (recipe: RecipeInfo) => void,
//   setUploading: (u: boolean | null) => void,
//   // flashContext: FlashState | undefined
// ) => {
//   if (!img) {
//     // flashContext?.addMessage('Please choose an image first', FlashLevel.Warning);
//     setUploading(null);
//     return;
//   }

//   const uploadTask: UploadTask = uploadBytesResumable(
//     ref(storage, `${recipe.type}/${recipe.id}`),
//     img
//   );

//   uploadTask.on(
//     'state_changed',
//     () => {},
//     (err) => console.log(err),
//     async () => {
//       const url = await getDownloadURL(uploadTask.snapshot.ref);
//       console.log(url);
//       const newRecipe = { ...recipe, imgURL: url };
//       setRecipe(newRecipe);
//       setUploading(false);
//     }
//   );
// };

// const isOverWritingData = async (recipe: RecipeInfo): Promise<boolean> => {
//   const path = `${recipe.type}/${recipe.id}`;

//   // Fetch the first page of 100.
//   const page = await list(ref(storage, path), { maxResults: 100 });

//   page.items.forEach((r: StorageReference) => {
//     console.log(r.name);
//     if (r.name === recipe.id + '.png' || r.name === recipe.id + '.jpg') {
//       return true;
//     }
//   });

//   // Fetch the second page if there are more elements.
//   if (page.nextPageToken) {
//     return isOverWritingData(recipe);
//   }

//   return false;
// };

// export { storage, uploadImage, isOverWritingData };
