import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ChevronRight, Apple, Heart, ArrowLeft, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password) => {
        const hasMinLength = password.length >= 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        
        if (!hasMinLength) return "Password must be at least 6 characters long.";
        if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
        if (!hasNumber) return "Password must contain at least one number.";
        return null;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        const validationError = validatePassword(formData.password);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: { data: { full_name: formData.name } }
        });
        if (error) setError(error.message);
        else navigate('/verify-email', { state: { email: formData.email } });
        setLoading(false);
    };

    const loginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/home`
            }
        });
        if (error) setError(error.message);
    };

    return (
        <div className="min-h-screen bg-[#f8f5f0] flex flex-col justify-center items-center p-6 pt-28 md:pt-32 pb-24 md:pb-32">
            <Link to="/" className="fixed top-8 left-8 flex items-center gap-2 font-bold text-[#2d3e34]/60 hover:text-[#2d3e34] transition-all group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Nature
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-white rounded-[3rem] p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
            >
                <div className="text-center mb-12">
                    <span className="text-[10px] font-bold text-[#5c7c64] uppercase tracking-[0.3em]">Meeyazh Naturals</span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2d3e34] mt-2">New Account</h1>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5c7c64] transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full bg-[#f8f5f0]/50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#5c7c64]/10 transition-all outline-none text-sm placeholder:text-gray-400"
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5c7c64] transition-colors w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full bg-[#f8f5f0]/50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#5c7c64]/10 transition-all outline-none text-sm placeholder:text-gray-400"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5c7c64] transition-colors w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="w-full bg-[#f8f5f0]/50 border-none rounded-2xl py-5 pl-16 pr-14 focus:ring-4 focus:ring-[#5c7c64]/10 transition-all outline-none text-sm placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5c7c64] transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="px-4 flex flex-wrap gap-x-4 gap-y-1">
                             <p className={`text-[10px] font-bold flex items-center gap-1 ${formData.password.length >= 6 ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                 {formData.password.length >= 6 ? '✓' : '○'} Min 6 chars
                             </p>
                             <p className={`text-[10px] font-bold flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                 {/[A-Z]/.test(formData.password) ? '✓' : '○'} One Uppercase
                             </p>
                             <p className={`text-[10px] font-bold flex items-center gap-1 ${/[0-9]/.test(formData.password) ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                 {/[0-9]/.test(formData.password) ? '✓' : '○'} One Number
                             </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-1">
                        <input type="checkbox" className="w-4 h-4 rounded-lg bg-gray-50 border-gray-200 text-[#5c7c64] focus:ring-[#5c7c64]" required />
                        <span className="text-xs font-medium text-gray-400">I agree to the Terms and Privacy Policy</span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2d3e34] text-white py-6 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#1f2b24] transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                        {loading ? 'Creating account...' : 'Create Account'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-widest text-[10px]">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={loginWithGoogle}
                        className="w-full bg-gray-50 border-2 border-gray-300 text-[#2d3e34] py-5 rounded-2xl font-bold shadow-sm hover:shadow-md hover:bg-gray-100 transition-all transform active:scale-95 flex items-center justify-center gap-3 group"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </button>

                    <p className="text-center text-sm font-medium text-[#2d3e34]/40 pt-4">
                        Already have an account? <Link to="/login" className="text-[#2d3e34] font-bold hover:underline underline-offset-6">Sign In</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};
