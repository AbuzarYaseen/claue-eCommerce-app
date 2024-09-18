"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpSchema } from "@/formValidationSchema/schema";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [hidePassword, setHidePassword] = useState("false");
  const router = useRouter();
  const backClick = (event) => {
    event.preventDefault(); // Prevent the default form submission
    router.push("/login");
  };
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = formValues;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential);
      toast.success("User Registerred!", {
        position: "top-right",
      });

      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      console.log(
        "Signup successful! Please check your email to verify your account."
      );
      toast.success("Verification email send check email!", {
        position: "top-right",
      });
      setTimeout(() => {
        router.push("/login");
      }, 5000);
      // Save additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: password,
      });
      console.log("data saved to db");
    } catch (error) {
      console.error("Error signing up:", error.message);
      toast.error("Error signing up ", {
        position: "top-right",
      });
    }
    console.log(formValues);
  };
  return (
    <div className="flex flex-col md:flex-row justify-between md:px-12 px-6 md:mx-16 mt-10">
      <div className="md:w-1/2 mr-5 ">
        <h1 className="text-[18px] font-bold">PERSONAL INFORMATION</h1>
        <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="flex flex-col ">
            <label htmlFor="" className="text-[13px] font-medium mb-2 ">
              First Name
            </label>
            <div>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={setFormValues.firstName}
                onChange={handleChange}
                className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
              />
              {/* <button
                onClick={() => {
                  setHidePassword(!hidePassword);
                }}
              >
                Show
              </button> */}
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-[13px] font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={setFormValues.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              name="lastName"
              className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
            />
          </div>
        </form>
      </div>
      <div className="md:w-1/2 ">
        <h1 className="text-[18px] font-bold">SIGN-IN INFORMATION</h1>
        <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="flex flex-col ">
            <label htmlFor="" className="text-[13px] font-medium mb-2 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={setFormValues.email}
              onChange={handleChange}
              className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-[13px] font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={setFormValues.password}
              onChange={handleChange}
              className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-[13px] font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={setFormValues.confirmPassword}
              onChange={handleChange}
              className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
            />
          </div>
          <div className="flex">
            <input type="checkbox" />
            <label className="text-[13px] ml-2">
              By using this form you agree with the storage and handling of your
              data by this website.
            </label>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-7 ">
            <button
              className=" border-2 rounded-3xl mb-4 p-2 border-black md:w-2/4 md:px-5 md:mr-6 text-[13px] font-bold hover:bg-black hover:text-white"
              onClick={backClick}
            >
              Back
            </button>
            <button
              className=" border-2 rounded-3xl mb-4 p-2 border-black hover:bg-red-300 hover:border-red-300 bg-black text-white md:w-2/4 md:px-5 text-[13px] font-bold"
              type="submit"
            >
              Create an Account
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
