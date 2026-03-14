import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, ShieldCheck, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleChange = (element, index) => {
        const value = element.value;
        if (isNaN(value)) return false;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Focus next input
        if (value !== '' && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '' && e.target.previousSibling) {
                e.target.previousSibling.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').trim();
        if (!/^\d+$/.test(data)) return; // Only digits

        const pasteData = data.slice(0, 6).split('');
        const newOtp = [...otp];
        
        pasteData.forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        
        setOtp(newOtp);
        
        // Focus last filled or next empty
        const nextIndex = Math.min(pasteData.length, 5);
        const inputs = document.querySelectorAll('input[type="text"]');
        if (inputs[nextIndex]) inputs[nextIndex].focus();
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const token = otp.join('');
        if (token.length !== 6) {
            setError("Please enter the full 6-digit code.");
            return;
        }

        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup'
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/home');
        }
        setLoading(false);
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;

        setLoading(true);
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
        });

        if (error) {
            setError(error.message);
        } else {
            setResendCooldown(60); // 1 minute cooldown
            setError(null);
            alert("A new verification code has been sent to your email.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#f8f5f0] flex flex-col justify-center items-center p-6 pb-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-white rounded-[3rem] p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 text-center"
            >
                <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Mail className="w-10 h-10 text-[#5c7c64]" />
                </div>

                <h1 className="font-serif text-4xl font-bold text-[#2d3e34] mb-4">Verify your email</h1>
                <p className="text-[#2d3e34]/50 font-medium mb-12">
                    We've sent a 6-digit verification code to <br />
                    <span className="text-[#2d3e34] font-bold">{email}</span>
                </p>

                <form onSubmit={handleVerify} className="space-y-10">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-between gap-2 md:gap-4">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                autoComplete={index === 0 ? "one-time-code" : "off"}
                                onPaste={index === 0 ? handlePaste : undefined}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                onFocus={e => e.target.select()}
                                className="w-full h-14 md:h-16 text-center text-xl font-bold rounded-2xl bg-[#f8f5f0] border-2 border-transparent focus:border-[#5c7c64] focus:bg-white outline-none transition-all"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2d3e34] text-white py-6 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#1f2b24] transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                        {loading ? 'Verifying...' : 'Verify Account'} <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    </button>

                    <div className="pt-4">
                        <p className="text-sm font-medium text-gray-400">
                            Didn't receive the code?{' '}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendCooldown > 0 || loading}
                                className={`font-bold transition-colors ${resendCooldown > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#2d3e34] hover:underline underline-offset-4'}`}
                            >
                                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                            </button>
                        </p>
                    </div>

                    <Link to="/signup" className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-[#2d3e34] transition-all pt-4">
                        <ArrowLeft className="w-3 h-3" /> Use a different email
                    </Link>
                </form>
            </motion.div>
        </div>
    );
};
