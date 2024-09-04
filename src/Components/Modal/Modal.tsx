import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { User } from "@/types/user";

interface ModalProps {
  openModal: boolean;
  handleClickOpenModal: () => void;
  handleCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  openModal,
  handleClickOpenModal,
  handleCloseModal,
}) => {
  const handleSave = () => {};

  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-user-dialog-title"
        aria-describedby="add-user-dialog-description"
      >
        <DialogTitle id="add-user-dialog-title">Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            name="taiKhoan"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            name="hoTen"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            name="matKhau"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            name="maLoaiNguoiDung"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
