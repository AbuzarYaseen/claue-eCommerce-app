// src/validationSchema.js
import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  agreeToTerms: Yup.bool().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});
