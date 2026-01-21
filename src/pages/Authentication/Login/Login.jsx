import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (data) => {
        setIsLoading(true);
        try {
            const result = await signIn(data.email, data.password);
            console.log('Login successful:', result);
            toast.success('Login successful!');
            navigate(location?.state || '/');
        } catch (error) {
            console.error('Login error:', error);
            const data = error.response?.data;
            const errorMessage = data?.non_field_errors?.[0] 
                || data?.detail 
                || data?.error 
                || 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-gray-900">Welcome Back</h3>
                <p className='text-gray-500 mt-2'>Please enter your details to sign in.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="space-y-4" disabled={isLoading}>
                    {/* email field */}
                    <div className="form-control">
                        <label className="label text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full h-12 px-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50"
                            placeholder="Enter your email"
                        />
                        {
                            errors.email?.type === 'required' &&
                            <p className='text-red-500 text-sm mt-1'>Email is required</p>
                        }
                    </div>

                    {/* password field */}
                    <div className="form-control">
                        <label className="label text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 8 })}
                            className="input input-bordered w-full h-12 px-4 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50"
                            placeholder="••••••••"
                        />
                        {
                            errors.password?.type === 'required' &&
                            <p className='text-red-500 text-sm mt-1'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' &&
                            <p className='text-red-500 text-sm mt-1'>Password must be 8 characters or longer</p>
                        }
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors">Forgot password?</Link>
                    </div>

                    <button 
                        type="submit"
                        className="btn btn-block h-12 bg-green-600 text-white hover:bg-green-700 border-none rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : 'Sign In'}
                    </button>
                    
                </fieldset>

                <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        state={location.state}
                        className='font-bold text-green-600 hover:text-green-800 transition-colors'
                        to="/register"
                    >
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
