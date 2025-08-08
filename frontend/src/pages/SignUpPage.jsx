import { EyeOff, Mail, MessageSquare, User, Eye, Lock, Loader, } from 'lucide-react';
import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from "../components/AuthImagePattern";
import toast from 'react-hot-toast';



export const SignUpPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return toast.error("Invalid email aformat");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");
        return true;
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const success = validateForm();
        if (success === true) signup(formData);

    }
    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                        group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='w-8  h-8 text-primary' />
                                <h1>PChat</h1>
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Full Name</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='w-5 h-5 text-base-content/40 z-20' />
                                </div>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='John Doe'
                                />
                            </div>
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Email</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='w-5 h-5 text-base-content/40 z-20' />
                                </div>
                                <input
                                    type="email"

                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`input input-bordered w-full pl-10`}
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
                                    <Lock className='w-5 h-5 text-base-content/40 z-20' />
                                </div>
                                <input
                                    id='input'
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`input input-bordered w-full pl-10`}
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

                            className={"btn btn-primary w-full"}
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader className='size-5 animate-spin ' />
                                    Loading....
                                </>) : ("Create Account ")}

                        </button>

                    </form>
                    <div className='text-center mt-4'>
                        <p className='text-base-content/60'>Already have an account?
                            <Link
                                to="/login"
                                className='link-primary link'
                            >
                                Sign in
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

