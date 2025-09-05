import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader, Mail, MessageSquare, Lock } from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern';
import { Link } from 'react-router-dom';


export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);

  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                        group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='w-8  h-8 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-base-content/60'>Sign in to your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40 z-20' />
                </div>
                <input
                  type="email"

                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='input input-bordered w-full pl-10'
                  placeholder='you@example.com'
                />
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40 z-20' />
                </div>
                <input
                  id='input'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className='input input-bordered w-full pl-10'
                  placeholder='********'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center '
                >
                  {showPassword ? (<EyeOff className='size-5 text-base-content/40' />) : (<Eye className='size-5 text-base-content/40' />)}
                </button>
              </div>
            </div>

            <button
              type='submit'
              onClick={() => login(formData)}

              className={"btn btn-primary w-full"}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader className='size-5 animate-spin ' />
                  Loading....
                </>) : ("Sign in ")}

            </button>

          </form>
          <div className='text-center mt-4'>
            <p className='text-base-content/60'>if you are new user?
              <Link
                to="/signup"
                className='link-primary link'
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with freinds, share moments, and stay in touch with your loved ones." />
    </div>
  )
}
