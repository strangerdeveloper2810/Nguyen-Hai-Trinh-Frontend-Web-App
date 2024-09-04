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

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  soDt: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number can only contain digits")
    .min(10, "Phone number must be at least 10 digits long")
    .max(11, "Phone number cannot exceed 11 digits"),

  hoTen: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters long")
    .max(50, "Full name cannot exceed 50 characters"),
});

export default validationSchema;
