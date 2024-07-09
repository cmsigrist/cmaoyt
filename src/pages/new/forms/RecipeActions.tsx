import { FC, useContext, useState } from "react";
import { RecipeInfo, RecipeType, newRecipe } from "../../../types/recipe";
import { Button, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { createId, marshallRecipe } from "../../../util/marshal";
import { HiddenInput } from "../../../components/HiddenInput";
import {
  deleteImage,
  downloadImage,
  isOverWritingData,
  uploadImage,
} from "../../../firebase/storage";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { checkAllInputs, isEmpty } from "../../../util/inputValidation";
import {
  deleteRecipe,
  isOverWritingRecipe,
  storeRecipe,
  updateRecipe,
} from "../../../firebase/database";
import RecipeActionModal from "./actions/RecipeActionsModal";
import { LoadingButton } from "@mui/lab";
import { ROUTE_PAGE, ROUTE_RECIPE } from "../../../routes";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "./actions/DeleteModal";
import CheckIcon from "@mui/icons-material/Check";
import { FlashContext } from "../../..";
import { FlashSeverity } from "../../../types/flash";

type RecipeActionProps = {
  recipe: RecipeInfo;
  setRecipe: (recipe: RecipeInfo) => void;
  image?: Blob | MediaSource;
  isEditMode: boolean;
  invalidInputs: Map<string, string>;
  setInvalidInputs: (i: Map<string, string>) => void;
};

const RecipeActions: FC<RecipeActionProps> = ({
  recipe,
  setRecipe,
  image,
  isEditMode,
  invalidInputs,
  setInvalidInputs,
}) => {
  // not undefined in edit mode
  const { type, categoryId, recipeId } = useParams();
  const flashContext = useContext(FlashContext);
  const navigate = useNavigate();

  const [uploading, setUploading] = useState<boolean | undefined>(undefined);
  const [exporting, setExporting] = useState<boolean | undefined>(undefined);
  const [importing, setImporting] = useState<boolean | undefined>(undefined);
  const [deleting, setDeleting] = useState<boolean | undefined>(undefined);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const isRecipeValid = (setLoading: (b: boolean | undefined) => void) => {
    if (recipe === newRecipe || recipe.id === "") {
      flashContext?.addMessage(
        "Error: cannot upload empty recipe",
        FlashSeverity.Error
      );
      console.log("empty recipe");
      setLoading(undefined);
      return false;
    }
    const inputs = checkAllInputs(invalidInputs, recipe);
    setInvalidInputs(inputs);
    // Some basic input validation
    if (!isEmpty(inputs)) {
      console.log("invalid inputs");
      console.log(invalidInputs);
      flashContext?.addMessage('Error: some fields were not correctly completed', FlashSeverity.Error);
      setLoading(undefined);
      return false;
    }

    return true;
  };

  const startRecipeUpload = async () => {
    setUploading(true);

    if (!isRecipeValid(setUploading)) {
      return;
    }

    // check id and path
    const isOverwritingStorage = await isOverWritingData(recipe);
    const isOverWritingDatabase = await isOverWritingRecipe(recipe);

    // If the recipe is not overwriting a pre-existing one, proceed with upload,
    // else ask if user is sure
    if (!isEditMode && (isOverWritingDatabase || isOverwritingStorage)) {
      setOpen(true);
    } else {
      proceedWithUpload();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setUploading(undefined);
  };

  const handleProceed = () => {
    setOpen(false);
    proceedWithUpload();
  };

  const proceedWithUpload = () => {
    // nothing to do image was not modified
    if (isEditMode && image === undefined) {
      uploadRecipe(recipe.imgURL);
      return;
    }
    if (image === undefined) {
      flashContext?.addMessage('Please choose an image first', FlashSeverity.Warning);
      setUploading(undefined);
      return;
    }
    //
    console.log("uploading image");
    uploadImage(image, recipe, uploadRecipe);
  };

  const uploadRecipe = (imgURL: string) => {
    const recipeWithImgURL = { ...recipe, imgURL };
    // edit mode
    if (isEditMode && recipeId !== undefined) {
      console.log("updating recipe");
      updateRecipe(recipeWithImgURL, type as RecipeType, recipeId, categoryId);
      flashContext?.addMessage("Recipe successfully updated", FlashSeverity.Success);
    } else {
      console.log("storing recipe");
      storeRecipe(recipeWithImgURL);
      flashContext?.addMessage("Recipe successfully created", FlashSeverity.Success);
    }

    setUploading(false);
    setTimeout(() => {
      setUploading(undefined);
      setTimeout(
        () =>
          navigate(
            ROUTE_RECIPE(
              recipe.type,
              recipe.id,
              recipe.category !== undefined
                ? createId(recipe.category)
                : undefined
            )
          ),
        1000
      );
    }, 2000);
  };

  const exportRecipe = async () => {
    setExporting(true);
    const jsonString = JSON.stringify(marshallRecipe(recipe));
    if (!isRecipeValid(setExporting)) {
      return;
    }
    downloadImage(recipe.imgURL)
      .then((blob) => {
        const zip = new JSZip();
        zip.file(`${recipe.id}.json`, jsonString);
        zip.file(recipe.id, blob);
        zip
          .generateAsync({ type: "blob" })
          .then((content) => {
            saveAs(content, `${recipe.id}.zip`);
            setExporting(false);
            setTimeout(() => setExporting(undefined), 2000);
          })
          .catch((e) => {
            console.log(console.error(e));
            setExporting(undefined);
          });
      })
      .catch((e) => {
        console.log(console.error(e));
        setExporting(undefined);
      });
  };

  const importRecipe = (e: any) => {
    setImporting(true);
    const file = e.target.files[0];
    fetch(URL.createObjectURL(file))
      .then((response) => response.json())
      .then((importedRecipe) => {
        console.log(importedRecipe);
        const newRecipe = marshallRecipe(importedRecipe);
        setRecipe(newRecipe);
        setImporting(false);
        setTimeout(() => setImporting(undefined), 2000);
      })
      .catch((e) => {
        console.log(console.error(e));
        setImporting(undefined);
      });
  };

  const handleDelete = () => {
    setDeleting(true);
    deleteImage(
      recipe.imgURL,
      () => {
        deleteRecipe(recipe);
        setDeleting(false);
        setOpenDelete(false);
        navigate(ROUTE_PAGE(recipe.type));
      },
      () => {
        setDeleting(false);
        setOpenDelete(false);
      }
    );
  };
  return (
    <>
      <RecipeActionModal
        open={open}
        handleClose={() => setOpen(false)}
        handleCancel={handleCancel}
        handleProceed={handleProceed}
      />
      <DeleteModal
        open={openDelete}
        deleting={deleting}
        handleClose={() => setOpenDelete(false)}
        handleCancel={() => setOpenDelete(false)}
        handleProceed={handleDelete}
      />
      <Stack
        marginTop={3}
        direction={"row"}
        spacing={1}
        justifyContent={"space-between"}
      >
        {isEditMode && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </Button>
        )}
        <LoadingButton
          loading={exporting}
          loadingPosition="start"
          variant="outlined"
          color={exporting === false ? "success" : undefined}
          startIcon={exporting === false ? <CheckIcon /> : <DownloadIcon />}
          onClick={exportRecipe}
        >
          {exporting === true
            ? "Exporting..."
            : exporting === false
            ? "Exported"
            : "Export"}
        </LoadingButton>

        <LoadingButton
          loading={importing}
          loadingPosition="start"
          component="label"
          variant="outlined"
          color={importing === false ? "success" : undefined}
          startIcon={importing === false ? <CheckIcon /> : <UploadIcon />}
        >
          {importing === true
            ? "Importing..."
            : importing === false
            ? "Imported"
            : "Import"}
          <HiddenInput type="file" onChange={importRecipe} />
        </LoadingButton>
        <LoadingButton
          loading={uploading}
          loadingPosition="start"
          variant="contained"
          color={uploading === false ? "success" : undefined}
          startIcon={uploading === false ? <CheckIcon /> : <CloudUploadIcon />}
          onClick={startRecipeUpload}
        >
          {uploading === true
            ? "Uploading..."
            : uploading === false
            ? "Uploaded"
            : "Upload"}
        </LoadingButton>
      </Stack>
    </>
  );
};

export default RecipeActions;
