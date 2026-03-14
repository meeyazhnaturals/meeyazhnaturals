import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const UpdatePassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const validatePassword = (password) => {
        const hasMinLength = password.length >= 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        
        if (!hasMinLength) return "Password must be at least 6 characters long.";
        if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
        if (!hasNumber) return "Password must contain at least one number.";
        return null;
    };

    useEffect(() => {
        // Check if there's a session (Supabase handles the recovery link automatically)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError('Your reset link is invalid or has expired. Please request a new one.');
            }
        };
        checkSession();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError("New Password: " + passwordError);
            return;
        }

        const confirmPasswordError = validatePassword(confirmPassword);
        if (confirmPasswordError) {
            setError("Confirm Password: " + confirmPasswordError);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const { error } = await supabase.auth.updateUser({ password });
            
            if (error) setError(error.message);
            else setSuccess(true);
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-6rem)] md:min-h-screen bg-[#f8f5f0] flex flex-col justify-center items-center p-6 pt-4 md:pt-20 pb-20 md:pb-32 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-white rounded-[3rem] p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
            >
                {success ? (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-inner">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h1 className="font-serif text-3xl font-bold text-[#2d3e34] mb-4">Password Updated</h1>
                        <p className="text-[#2d3e34]/50 mb-10 leading-relaxed">
                            Your password has been successfully updated. You can now sign in with your new credentials.
                        </p>
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-[#2d3e34] text-white px-10 py-5 rounded-2xl font-bold shadow-lg hover:bg-[#1f2b24] transition-all"
                        >
                            Sign In Now
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-12">
                            <span className="text-[10px] font-bold text-[#5c7c64] uppercase tracking-[0.3em]">Security Center</span>
                            <h1 className="font-serif text-4xl mb-4 font-bold text-[#2d3e34] mt-2">New Password</h1>
                            <p className="text-[#2d3e34]/50 font-medium">Create a strong password to secure your account.</p>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-3">
                                    <ShieldAlert className="w-5 h-5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative group">
                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5c7c64] transition-colors w-5 h-5" />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-[#f8f5f0]/50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#5c7c64]/10 transition-all outline-none text-sm placeholder:text-gray-400"
                                            required
                                        />
                                    </div>
                                    {password && (
                                        <div className="px-4 flex flex-wrap gap-x-4 gap-y-1">
                                            <p className={`text-[10px] font-bold flex items-center gap-1 ${password.length >= 6 ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                                {password.length >= 6 ? '✓' : '○'} Min 6 chars
                                            </p>
                                            <p className={`text-[10px] font-bold flex items-center gap-1 ${/[A-Z]/.test(password) ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                                {/[A-Z]/.test(password) ? '✓' : '○'} One Uppercase
                                            </p>
                                            <p className={`text-[10px] font-bold flex items-center gap-1 ${/[0-9]/.test(password) ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                                {/[0-9]/.test(password) ? '✓' : '○'} One Number
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="relative group">
                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5c7c64] transition-colors w-5 h-5" />
                                        <input
                                            type="password"
                                            placeholder="Confirm New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-[#f8f5f0]/50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#5c7c64]/10 transition-all outline-none text-sm placeholder:text-gray-400"
                                            required
                                        />
                                    </div>
                                    {confirmPassword && (
                                        <div className="px-4 flex flex-wrap gap-x-4 gap-y-1">
                                            <p className={`text-[10px] font-bold flex items-center gap-1 ${confirmPassword.length >= 6 ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                                {confirmPassword.length >= 6 ? '✓' : '○'} Min 6 chars
                                            </p>
                                            <p className={`text-[10px] font-bold flex items-center gap-1 ${/[A-Z]/.test(confirmPassword) ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                                {/[A-Z]/.test(confirmPassword) ? '✓' : '○'} One Uppercase
                                            </p>
                                            <p className={`text-[10px] font-bold flex items-center gap-1 ${/[0-9]/.test(confirmPassword) ? 'text-[#5c7c64]' : 'text-gray-300'}`}>
                                                {/[0-9]/.test(confirmPassword) ? '✓' : '○'} One Number
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#2d3e34] text-white py-6 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#1f2b24] transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group"
                            >
                                {loading ? 'Updating...' : 'Update Password'} 
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
};
