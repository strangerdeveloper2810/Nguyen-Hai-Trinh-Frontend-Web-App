import _ from "lodash";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useAppContext } from "@/app/context/AppProvider";
import validationSchema from "@/app/(auth)/register/validation";
import { User } from "@/types/user";
import http from "@/utils/setting";

interface ModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  openModalEdit: boolean;
  userEdit: User;
}

const Modal: React.FC<ModalProps> = ({
  openModal,
  handleCloseModal,
  openModalEdit,
  userEdit,
}) => {
  const { accessToken } = useAppContext();

  const handleAddUser = async (user: User) => {
    try {
      const res = await http.post("/QuanLyNguoiDung/ThemNguoiDung", user, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (_.get(res, "status") === 200) {
        alert("Thêm người dùng thành công");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async (user: User) => {
    try {
      const res = await http.put(
        `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        user,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (_.get(res, "status") === 200) {
        alert("Cập nhật người dùng thành công");
      } else {
        alert(_.get(res, "content", ""));
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const formik = useFormik<User>({
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      matKhau: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
    },
    validationSchema,
    onSubmit: async (values: User) => {
      if (openModalEdit) {
        await handleEditUser(values);
      } else {
        await handleAddUser(values);
      }
      handleCloseModal(); // Close the modal after submission
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
  } = formik;

  useEffect(() => {
    if (openModalEdit) {
      setValues(userEdit); // Update form values when userEdit changes
    }
  }, [userEdit, openModalEdit, setValues]);

  return (
    <React.Fragment>
      <Dialog
        open={openModal || openModalEdit}
        onClose={handleCloseModal}
        aria-labelledby="add-user-dialog-title"
        aria-describedby="add-user-dialog-description"
      >
        <DialogTitle id="add-user-dialog-title">
          {openModalEdit ? "Edit User" : "Add New User"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="User Name"
              name="taiKhoan"
              type="text"
              fullWidth
              variant="outlined"
              value={values.taiKhoan}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.taiKhoan && Boolean(errors.taiKhoan)}
              helperText={touched.taiKhoan && errors.taiKhoan}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              name="hoTen"
              type="text"
              fullWidth
              variant="outlined"
              value={values.hoTen}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.hoTen && Boolean(errors.hoTen)}
              helperText={touched.hoTen && errors.hoTen}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              margin="dense"
              name="matKhau"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={values.matKhau}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.matKhau && Boolean(errors.matKhau)}
              helperText={touched.matKhau && errors.matKhau}
            />
            <TextField
              margin="dense"
              name="soDt"
              label="Phone Number"
              type="text"
              fullWidth
              variant="outlined"
              value={values.soDt}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.soDt && Boolean(errors.soDt)}
              helperText={touched.soDt && errors.soDt}
            />
            <TextField
              margin="dense"
              name="maLoaiNguoiDung"
              label="Role"
              type="text"
              fullWidth
              variant="outlined"
              value={values.maLoaiNguoiDung}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.maLoaiNguoiDung && Boolean(errors.maLoaiNguoiDung)}
              helperText={touched.maLoaiNguoiDung && errors.maLoaiNguoiDung}
            />
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button color="primary" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default Modal;
