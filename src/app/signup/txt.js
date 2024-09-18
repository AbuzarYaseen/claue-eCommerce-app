"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpSchema } from "../../validationSchema"; // Import validation schema

const SignUp = () => {
  const router = useRouter();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const { firstName, lastName, email, password } = values;

    // Disable the submit button while the form is submitting
    setSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      toast.success("Verification email sent. Please check your email!", {
        position: "top-right",
      });

      // Save additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
      });

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error) {
      console.error("Error signing up:", error.message);
      toast.error(`Error signing up: ${error.message}`, {
        position: "top-right",
      });
    }

    // Enable the submit button after the form is processed
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between px-12 mx-16 mt-10">
      <div className="md:w-1/2 mr-5">
        <h1 className="text-[18px] font-bold">PERSONAL INFORMATION</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema} // Use validation schema here
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="text-[13px] font-medium mb-2"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="text-[13px] font-medium mb-2"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="md:w-1/2">
                <h1 className="text-[18px] font-bold">SIGN-IN INFORMATION</h1>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-[13px] font-medium mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-[13px] font-medium mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[13px] font-medium mb-2"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="flex">
                  <Field type="checkbox" name="agreeToTerms" />
                  <label className="text-[13px] ml-2">
                    By using this form you agree with the storage and handling
                    of your data by this website.
                  </label>
                </div>

                <div className="flex flex-col md:flex-row justify-between mt-7">
                  <button
                    className="border-2 rounded-3xl mb-4 p-2 border-black md:w-2/4 md:px-5 md:mr-6 text-[13px] font-bold hover:bg-black hover:text-white"
                    onClick={() => router.push("/login")}
                  >
                    Back
                  </button>
                  <button
                    className="border-2 rounded-3xl mb-4 p-2 border-black hover:bg-red-300 hover:border-red-300 bg-black text-white md:w-2/4 md:px-5 text-[13px] font-bold"
                    type="submit"
                    disabled={isSubmitting} // Disable button when form is submitting
                  >
                    Create an Account
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
