"use client";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  //navigate to signup page
  const navigateSignup = () => {
    router.push("/signup");
  };
  //forget/reset password
  const handlePasswordReset = () => {
    const { email } = formValues;
    if (!email) {
      console.log;
      ("Please enter your email first");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent. Check your inbox.");
      })
      .catch((error) => {
        console.log;
        "Error sending password reset email: " + error.message;
      });
  };

  //login user
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log("User logged in:", userCredential.user);
        //router.push("/home");
      } else {
        console.log(
          "Email not verified. Please check your email and verify first"
        );
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-between px-6 md:px-12 md:mx-16 mt-16">
      <div className="md:w-1/2 mr-5 ">
        <h1 className="text-[18px] font-bold mb-5">Registered Customers</h1>
        <p className="text-[14px] italic text-gray-500">
          If you have an account, sign in with your email address.
        </p>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-[13px] font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="border-2 rounded-3xl mb-4 p-2 border-gray-500 text-[13px] pl-4 "
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-[13px] font-semibold mb-2">
              Password{" "}
            </label>
            <input
              type="password"
              name="password"
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
          <div className="flex flex-row justify-between mt-7 md:justify-normal ">
            <button
              className=" border-2 rounded-3xl mb-4 p-2 border-black w-1/3 md:px-5 md:mr-6 text-[13px] font-bold bg-black text-white hover:bg-red-300 hover:border-red-300"
              type="submit"
            >
              Sign In
            </button>
            <button
              className=" border-2 rounded-3xl mb-4 p-2 hover:text-red-300 w-2/4 text-[13px] font-bold"
              type="submit"
              onClick={handlePasswordReset}
            >
              Forget Your Password?
            </button>
          </div>
        </form>
      </div>
      <div className="md:w-1/2 ">
        <h1 className="text-[18px] font-bold mb-5">New Customers</h1>
        <p className="text-[14px]  text-gray-500">
          By creating an account with our store, you will be able to move
          through the checkout process faster, store multiple shipping
          addresses, view and track your orders in your account and more.
        </p>
        <button
          className="mt-10 border-2 rounded-3xl px-6 p-2 border-red-300 hover:bg-black hover:border-black bg-red-300 text-white text-[14px] font-bold"
          onClick={navigateSignup}
        >
          Create An Account
        </button>
      </div>
    </div>
  );
};

export default Login;
