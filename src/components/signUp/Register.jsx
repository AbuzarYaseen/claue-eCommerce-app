"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpSchema } from "@/formValidationSchema/schema";
import Image from "next/image";
// import signup_img from "@/app/public/assests/signup_img.png";

const Register = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState("false");
  const [showConfirmPass, setShowConfirmPass] = useState("false");
  const router = useRouter();
  const backClick = (event) => {
    event.preventDefault(); // Prevent the default form submission
    router.push("/login");
  };
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (formValues, { setSubmitting }) => {
    const { firstName, lastName, email, password } = formValues;

    // Disable the submit button while the form is submitting
    setSubmitting(true);
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
    // Enable the submit button after the form is processed
    setSubmitting(false);
    console.log(formValues);
  };
  return (
    <>
      {/* <Image src={signup_img} /> */}
      <div className=" mx-auto xl:mx-10 my-8 ">
        <div className="flex flex-col md:flex-row justify-between mt-8 px-5 md:px-10 mx-auto max-w-screen-2xl">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              agreeToTerms: false,
            }}
            validationSchema={signUpSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <>
                {/* Personal Information */}
                <div className="md:w-1/2 mr-5">
                  <h1 className="text-[18px] xl:text-xl font-bold">
                    PERSONAL INFORMATION
                  </h1>
                  <Form className="mt-6">
                    <div className="flex flex-col">
                      <label className="text-[13px] xl:text-[17px] font-medium mb-2">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] xl:text-[17px] pl-4"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-xs xl:text-[17px]  mb-5"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[13px] xl:text-[17px] font-medium mb-2">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] xl:text-[17px] pl-4"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-xs xl:text-[17px] mb-5"
                      />
                    </div>
                  </Form>
                </div>

                {/* Sign-In Information */}
                <div className="md:w-1/2">
                  <h1 className="text-[18px] xl:text-xl font-bold">
                    SIGN-IN INFORMATION
                  </h1>
                  <Form className="mt-6">
                    <div className="flex flex-col">
                      <label className="text-[13px] xl:text-[17px] font-medium mb-2">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] xl:text-[17px] pl-4"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs xl:text-[17px] mb-5"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[13px] xl:text-[17px] font-medium mb-2">
                        Password
                      </label>
                      <div className="border-gray-500 border-2 rounded-3xl mb-4 flex justify-between">
                        <Field
                          type={showPassword ? "password" : "text"}
                          name="password"
                          placeholder="Password"
                          className="rounded-3xl p-2  text-[13px] xl:text-[17px] pl-4 focus:outline-none"
                        />

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword((prev) => !prev);
                          }}
                          className="mr-5 text-[13px] xl:text-[17px]"
                        >
                          {showPassword ? "Show" : "Hide"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs xl:text-[17px] mb-5"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[13px] xl:text-[17px] font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="border-gray-500 border-2 rounded-3xl mb-4 flex justify-between">
                        <Field
                          type={showConfirmPass ? "password" : "text"}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          className=" rounded-3xl  p-2 focus:outline-none text-[13px] xl:text-[17px] pl-4 "
                        />

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setShowConfirmPass((prev) => !prev);
                          }}
                          className=" text-[13px] xl:text-[17px] mr-5"
                        >
                          {showConfirmPass ? "Show" : "Hide"}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-xs xl:text-[17px] mb-5"
                      />
                    </div>

                    <div className="flex">
                      <Field type="checkbox" name="agreeToTerms" />
                      <label className="text-[13px] xl:text-[17px] ml-2">
                        By using this form you agree with the storage and
                        handling of your data by this website.
                      </label>
                    </div>
                    <ErrorMessage
                      name="agreeToTerms"
                      component="div"
                      className="text-red-500 text-xs xl:text-[17px] mb-5"
                    />

                    <div className="flex flex-col md:flex-row justify-between mt-7">
                      <button
                        type="button"
                        className="border-2 rounded-3xl mb-4 p-2 border-black md:w-2/4 md:px-5 md:mr-6 text-[13px] xl:text-[17px] font-bold hover:bg-black hover:text-white"
                        onClick={() => router.push("/login")}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="border-2 rounded-3xl mb-4 p-2 border-black hover:bg-red-300 hover:border-red-300 bg-black text-white md:w-2/4 md:px-5 text-[13px] xl:text-[17px] font-bold"
                      >
                        Create an Account
                      </button>
                    </div>
                  </Form>
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
