import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ChevronRight, Apple, Github, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });
        if (error) setError(error.message);
        else navigate('/home');
        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-6rem)] md:min-h-screen bg-[#f8f5f0] flex flex-col justify-center items-center p-6 pt-4 md:pt-20 pb-20 md:pb-32">
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
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2d3e34] mt-2">Welcome Back.</h1>
                    <p className="text-[#2d3e34]/50 mt-4 font-medium">Continue your journey to holistic health.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
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
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="w-full bg-[#f8f5f0]/50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#5c7c64]/10 transition-all outline-none text-sm placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end p-1">
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-[#2d3e34] hover:underline underline-offset-4 tracking-widest uppercase">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2d3e34] text-white py-6 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#1f2b24] transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                        {loading ? 'Entering Home...' : 'Sign In'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-center text-sm font-medium text-[#2d3e34]/40 pt-4">
                        Don't have an account? <Link to="/signup" className="text-[#2d3e34] font-bold hover:underline underline-offset-6">Create one</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};
