import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as authLogin } from '../Store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
    // console.log(data);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo width="50px" />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{"   "}
          <Link to="/signup"
            className="text-purple-600 hover:underline font-medium underline">
            Sign up
          </Link>
        </p>

        {
          error && <p className="text-red-500 mt-6 text-center text-sm font-medium">
            {error}
          </p>
        }

        <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-5">
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })
            }
          />

          <Input
            label="Password:"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          <Button type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
