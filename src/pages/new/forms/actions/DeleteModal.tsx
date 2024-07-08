import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type DeleteModalProps = {
  open: boolean;
  deleting: boolean | undefined;
  handleClose: (close: boolean) => void;
  handleCancel: () => void;
  handleProceed: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({
  open,
  deleting,
  handleClose,
  handleCancel,
  handleProceed,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{"Delete recipe"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this recipe? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          loading={deleting}
          loadingPosition="start"
          startIcon={<DeleteIcon />}
          variant="outlined"
          color="error"
          onClick={handleProceed}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
