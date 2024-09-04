import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(20, "Username cannot exceed 20 characters"),

  matKhau: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
});

export default validationSchema;
