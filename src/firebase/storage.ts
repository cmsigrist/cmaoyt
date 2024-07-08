import {
  deleteObject,
  getBlob,
  getDownloadURL,
  getStorage,
  list,
  listAll,
  ref,
  StorageReference,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { app } from "./firebase";
import { RecipeInfo } from "../types/recipe";

const storage = getStorage(app);

const uploadImage = (
  img: any,
  recipe: RecipeInfo,
  onComplete: (url: string) => void
) => {
  console.log("uploading image in " + `${recipe.type}/${recipe.id}`);
  const uploadTask: UploadTask = uploadBytesResumable(
    ref(storage, `${recipe.type}/${recipe.id}`),
    img
  );

  return uploadTask.on(
    "state_changed",
    () => {},
    (err) => console.log(err),
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      console.log(url);
      onComplete(url);
    }
  );
};

const downloadImage = (imgURL: string) => {
  return getBlob(ref(storage, imgURL));
};

const deleteImage = (
  imgURL: string,
  onComplete: () => void,
  onError: () => void
) => {
  // Delete the file
  deleteObject(ref(storage, imgURL))
    .then(() => {
      console.log("deleted " + imgURL);
      onComplete();
    })
    .catch((err) => {
      console.log(err);
      onError();
    });
};

const isOverWritingData = async (recipe: RecipeInfo): Promise<boolean> => {
  // Find all the prefixes and items.
  listAll(ref(storage, `${recipe.type}`))
    .then((res) => {
      res.items.forEach((r: StorageReference) => { 
        // All the items under listRef.
        console.log(r.name);
        if (r.name === recipe.id + ".png" || r.name === recipe.id + ".jpg") {
          return true;
        }
      });
    })
    .catch((err) => {
      // Uh-oh, an error occurred!
      console.log(err)
    });

  return false;
};

export { storage, uploadImage, downloadImage, deleteImage, isOverWritingData };
