import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallSpinner from "../../components/Spinner/SmallSpinner";
import { AuthContext } from "../../contexts/AuthProvider";
import useTitle from "../../hooks/useTitle";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  useTitle("Login");
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm();

  const { signIn, loading, signInWithGoogle, setLoading, resetPassword } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    setLoginError("");
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setLoginUserEmail(email);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
        setLoading(false);
      })
      .finally(() => {
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
        setLoginUserEmail(email);
      });
  };

  const handleGoogleSignin = () => {
    signInWithGoogle().then((result) => {
      console.log(result);
      saveUser(result.user.displayName, result.user.email);
    });
  };

  // Pass reset
  const handleReset = () => {
    resetPassword(userEmail)
      .then(() => {
        toast.success("Please check your email for reset link");
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              onBlur={(event) => setUserEmail(event.target.value)}
              name="email"
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" className="input input-bordered w-full max-w-xs" required />
          </div>
          {/* <input className="btn btn-accent w-full" value="Login" type="submit" /> */}
          <button className="btn btn-primary w-full mt-2">{loading ? <SmallSpinner /> : "Login"}</button>
          <div>{loginError && <p className="text-red-600">{loginError}</p>}</div>
        </form>
        <p>
          New to My Laundry House ?
          <Link className="text-secondary" to="/signup">
            Create new Account
          </Link>
        </p>
        <span className="text-xl mr-2">Forget Password?</span>
        <button onClick={handleReset} className="btn btn-outline btn-primary">
          Please reset
        </button>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignin} className="btn btn-outline btn-primary w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
