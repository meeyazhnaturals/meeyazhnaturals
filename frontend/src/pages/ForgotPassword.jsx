import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSendCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            setError(error.message);
        } else {
            setShowOtp(true);
            setMessage("A 6-digit reset code has been sent to your email.");
        }
        setLoading(false);
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value.substring(element.value.length - 1);
        setOtp(newOtp);
        if (element.value !== '' && element.nextSibling) element.nextSibling.focus();
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = otp.join('');
        const { error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'recovery'
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/update-password');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#f8f5f0] flex flex-col justify-center items-center p-6 pb-24">
            <Link to="/login" className="fixed top-8 left-8 flex items-center gap-2 font-bold text-[#2d3e34]/60 hover:text-[#2d3e34] transition-all group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Login
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-white rounded-[3rem] p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
            >
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-orange-500" />
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2d3e34]">
                        {showOtp ? "Verify Code" : "Forgot Password?"}
                    </h1>
                    <p className="text-[#2d3e34]/50 mt-4 font-medium">
                        {showOtp ? "Check your inbox for the reset code" : "No worries! Enter your email to receive a reset code."}
                    </p>
                </div>

                {!showOtp ? (
                    <form onSubmit={handleSendCode} className="space-y-6">
                        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-shake">{error}</div>}
                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5c7c64] transition-colors w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#f8f5f0]/50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#5c7c64]/10 transition-all outline-none text-sm placeholder:text-gray-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2d3e34] text-white py-6 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#1f2b24] transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group"
                        >
                            {loading ? 'Sending Code...' : 'Send Reset Code'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-10">
                        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-shake">{error}</div>}
                        {message && <div className="bg-green-50 text-green-600 p-4 rounded-xl text-xs font-bold border border-green-100">{message}</div>}
                        
                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={e => handleOtpChange(e.target, index)}
                                    className="w-full h-14 text-center text-xl font-bold rounded-xl bg-[#f8f5f0] border-2 border-transparent focus:border-[#5c7c64] focus:bg-white outline-none transition-all"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2d3e34] text-white py-6 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#1f2b24] transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group"
                        >
                            {loading ? 'Verifying...' : 'Verify Code'} <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                        </button>
                        
                        <p className="text-center text-sm font-medium text-gray-400">
                            Didn't get the code? <button type="button" onClick={() => setShowOtp(false)} className="text-[#2d3e34] font-bold hover:underline">Try again</button>
                        </p>
                    </form>
                )}
            </motion.div>
        </div>
    );
};
