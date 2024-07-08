import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";

type RecipeActionModalProps = {
  open: boolean
  handleClose: (close: boolean) => void
  handleCancel: () => void
  handleProceed: () => void
}

const RecipeActionModal: FC<RecipeActionModalProps> = ({open, handleClose, handleCancel, handleProceed}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        {"Overwrite existing recipe?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A recipe with the same name already exist, are you sure you want to overwrite it?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined" color={"error"}>
          Cancel
        </Button>
        <Button onClick={handleProceed} variant="outlined" autoFocus>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeActionModal