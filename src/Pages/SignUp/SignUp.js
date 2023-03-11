import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SmallSpinner from "../../components/Spinner/SmallSpinner";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  useTitle("SignUp");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, updateUser, signInWithGoogle, verifyEmail, loading, setLoading } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const [createdUserEamil, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEamil);
  const navigate = useNavigate();
  if (token) {
    navigate("/");
  }
  const handleSignup = (data) => {
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User created successfully");
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
            verifyEmail().then(() => {
              toast.success("Please check your email for verification link");
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error.message);
        setSignUpError(error.message);
        setLoading(false);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };

  const handleGoogleSignin = () => {
    signInWithGoogle().then((result) => {
      console.log(result);
      saveUser(result.user.displayName, result.user.email);
    });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Your name is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && <p className="text-red-600">{errors.name?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be 6 characters or longer" },
                // pattern: {
                //   value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                //   message: "Password must have uppercase, number and special characters",
                // },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
          </div>
          {/* <input className="btn btn-accent w-full mt-4" value="Sign Up" type="submit" /> */}
          <button className="btn btn-primary w-full">{loading ? <SmallSpinner /> : "Sign Up"}</button>
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p>
          All ready have an account?{" "}
          <Link className="text-secondary" to="/login">
            Please login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignin} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
