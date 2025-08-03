import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { Button, Input, Logo } from './index';
import { login } from '../Store/authSlice';

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    console.log("create")
    setError("");

    try {
      const account = await authService.createAccount(data);
      console.log("account creted :", account)
      if (account) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-purple-50 px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-purple-200'>

        {/* Logo */}
        <div className='flex justify-center mb-6'>
          <Logo width="50" />
        </div>

        {/* Title */}
        <h2 className='text-2xl font-extrabold text-center text-purple-700 mb-2'>
          Create an Account
        </h2>

        {/* Subtitle */}
        <p className='text-center text-gray-500 text-sm mb-6'>
          Already have an account?{" "}
          <Link
            to="/login"
            className='text-purple-600 hover:underline font-medium'>
            Log in here
          </Link>
        </p>

        {/* Error message */}
        {error && (
          <p className='text-center text-red-500 text-sm mb-4'>
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className='space-y-5'>

          <Input
            label="Full Name"
            placeholder="John Doe"
            {...register("name", { required: true })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <Button
            type='submit'
            className='w-full bg-purple-600 hover:bg-purple-700 cursor-pointer'>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
