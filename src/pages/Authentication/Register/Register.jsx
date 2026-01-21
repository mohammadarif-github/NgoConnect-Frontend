import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await createUser(
        data.email,
        data.firstName,
        data.lastName,
        data.password,
        data.confirmPassword
      );
      console.log('Registration successful:', result);
      toast.success('Registration successful! Please check your email for OTP verification.');
      setRegisteredEmail(data.email);
      setShowOTPModal(true);
    } catch (error) {
      console.error('Registration error:', error);
      const data = error.response?.data;
      
      // Check for specific field errors or non-field errors
      const errorMessage = data?.non_field_errors?.[0]
        || data?.email?.[0]
        || data?.password?.[0]
        || data?.first_name?.[0]
        || data?.detail
        || 'Registration failed. Please try again.';
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const handleOTPVerified = () => {
    setShowOTPModal(false);
    toast.success('Email verified! You can now login.');
    navigate('/login');
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join us and start your journey.</p>
        </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <fieldset className="space-y-4" disabled={isLoading}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="form-control">
                      <label className="label text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        {...register('firstName', { required: true })}
                        className="input input-bordered w-full h-11 px-4 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50"
                        placeholder="John"
                      />
                      {errors.firstName?.type === 'required' && (
                        <p className='text-red-500 text-xs mt-1'>First name required</p>
                      )}
                  </div>

                  {/* Last Name */}
                  <div className="form-control">
                      <label className="label text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        {...register('lastName', { required: true })}
                        className="input input-bordered w-full h-11 px-4 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50"
                        placeholder="Doe"
                      />
                      {errors.lastName?.type === 'required' && (
                        <p className='text-red-500 text-xs mt-1'>Last name required</p>
                      )}
                  </div>
              </div>

              {/* Email */}
              <div className="form-control">
                  <label className="label text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className="input input-bordered w-full h-11 px-4 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50"
                    placeholder="john@example.com"
                  />
                  {errors.email?.type === 'required' && (
                    <p className='text-red-500 text-xs mt-1'>Email is required</p>
                  )}
              </div>

              {/* Password */}
              <div className="form-control">
                  <label className="label text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    {...register('password', { 
                      required: true, 
                      minLength: 8,
                      pattern: /(?=.*\d)/ 
                    })}
                    className="input input-bordered w-full h-11 px-4 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50"
                    placeholder="••••••••"
                  />
                  {errors.password?.type === 'required' && (
                    <p className='text-red-500 text-xs mt-1'>Password is required</p>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <p className='text-red-500 text-xs mt-1'>
                      Must be at least 8 chars
                    </p>
                  )}
                  {errors.password?.type === 'pattern' && (
                    <p className='text-red-500 text-xs mt-1'>
                      Must contain a number
                    </p>
                  )}
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                  <label className="label text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    {...register('confirmPassword', { 
                      required: true,
                      validate: value => value === password || "Passwords do not match"
                    })}
                    className="input input-bordered w-full h-11 px-4 rounded-lg focus:ring-2 focus:ring-green-500 bg-gray-50"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword?.type === 'required' && (
                    <p className='text-red-500 text-xs mt-1'>Confirm password</p>
                  )}
                  {errors.confirmPassword?.message && (
                    <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword.message}</p>
                  )}
              </div>

              <button 
                type="submit" 
                className="btn btn-block h-12 bg-green-600 text-white mt-6 hover:bg-green-700 border-none rounded-lg font-semibold shadow-md transition-all"
                disabled={isLoading}
              >
                {isLoading ? <span className="loading loading-spinner"></span> : 'Create Account'}
              </button>
            </fieldset>

            <p className="text-center text-gray-600 mt-6">
              <small className="text-base">
                Already have an account?{' '}
                <Link className="font-bold text-green-600 hover:text-green-800 transition-colors" to="/login">
                  Sign in
                </Link>
              </small>
            </p>
          </form>
      </div>

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <OTPVerificationModal 
          email={registeredEmail} 
          onClose={() => setShowOTPModal(false)}
          onVerified={handleOTPVerified}
        />
      )}
    </>
  );
};

// OTP Verification Modal Component
const OTPVerificationModal = ({ email, onClose, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { verifyEmail, resendOTP } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(email, otp);
      toast.success('Email verified successfully!');
      onVerified();
    } catch (error) {
      console.error('OTP verification error:', error);
      const errorMessage = error.response?.data?.detail 
        || error.response?.data?.error
        || 'Invalid OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await resendOTP(email);
      toast.success('OTP resent to your email!');
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Verify Your Email</h3>
        <p className="mb-4 text-gray-600">
          We've sent a 6-digit OTP to <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="input input-bordered w-full mb-4 text-center text-2xl tracking-widest"
            placeholder="000000"
            maxLength={6}
            disabled={isLoading}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="btn bg-green-500 text-white hover:bg-green-700 flex-1"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
            <button
              type="button"
              onClick={handleResend}
              className="btn btn-outline flex-1"
              disabled={isLoading}
            >
              Resend OTP
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="btn btn-ghost w-full mt-2"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Register;
