import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, MessageCircle, Clock, Loader2 } from 'lucide-react';

export const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="bg-[#f8f5f0] min-h-screen pt-32 pb-24 font-sans">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-20">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5c7c64] mb-4 block"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-5xl md:text-6xl font-bold text-[#2d3e34]"
                    >
                        We'd Love to <span className="italic font-medium opacity-80 underline decoration-[#5c7c64]/20 underline-offset-8">Hear From You</span>
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left Side: Contact Info */}
                    <div className="lg:col-span-5 space-y-10">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100"
                        >
                            <h3 className="font-serif text-2xl font-bold text-[#2d3e34] mb-10">Contact Details</h3>
                            
                            <div className="space-y-8">
                                <div className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 bg-[#f8f5f0] rounded-2xl flex items-center justify-center text-[#5c7c64] shrink-0 group-hover:bg-[#5c7c64] group-hover:text-white transition-all duration-500">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Call Us</p>
                                        <p className="text-lg font-bold text-[#2d3e34] hover:text-[#5c7c64] transition-colors cursor-pointer">+91 93630 85956</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 bg-[#f8f5f0] rounded-2xl flex items-center justify-center text-[#5c7c64] shrink-0 group-hover:bg-[#5c7c64] group-hover:text-white transition-all duration-500">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                                        <p className="text-lg font-bold text-[#2d3e34] hover:text-[#5c7c64] transition-colors cursor-pointer break-all">meeyazhnaturals@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 bg-[#f8f5f0] rounded-2xl flex items-center justify-center text-[#5c7c64] shrink-0 group-hover:bg-[#5c7c64] group-hover:text-white transition-all duration-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Visit Us</p>
                                        <p className="text-lg font-bold text-[#2d3e34] leading-relaxed">
                                            Coimbatore,<br />
                                            Tamil Nadu, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 bg-[#f8f5f0] rounded-2xl flex items-center justify-center text-[#5c7c64] shrink-0 group-hover:bg-[#5c7c64] group-hover:text-white transition-all duration-500">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Working Hours</p>
                                        <p className="text-lg font-bold text-[#2d3e34]">Mon - Sat: 9:00 AM - 7:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-gray-50">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Social Connect</p>
                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/meeyazhnaturals" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#f8f5f0] rounded-2xl flex items-center justify-center text-[#5c7c64] hover:bg-[#2d3e34] hover:text-white transition-all shadow-sm">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="w-12 h-12 bg-[#f8f5f0] rounded-2xl flex items-center justify-center text-[#5c7c64] hover:bg-[#25D366] hover:text-white transition-all shadow-sm">
                                        <MessageCircle className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-gray-100"
                        >
                            {submitted ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-inner">
                                        <Send className="w-8 h-8" />
                                    </div>
                                    <h2 className="font-serif text-3xl font-bold text-[#2d3e34] mb-4">Message Sent!</h2>
                                    <p className="text-gray-400 mb-10 max-w-sm mx-auto">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                    <button 
                                        onClick={() => setSubmitted(false)}
                                        className="text-[#5c7c64] font-bold text-sm tracking-widest uppercase hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <h3 className="font-serif text-2xl font-bold text-[#2d3e34] mb-2">Send us a Message</h3>
                                    <p className="text-gray-400 text-sm mb-10 italic">Have a question about our natural products? Fill out the form below.</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Full Name</label>
                                            <input 
                                                required 
                                                placeholder="Enter your name"
                                                className="w-full bg-[#f8f5f0] border-transparent rounded-[1.5rem] p-5 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Email Address</label>
                                            <input 
                                                required 
                                                type="email" 
                                                placeholder="Enter your email"
                                                className="w-full bg-[#f8f5f0] border-transparent rounded-[1.5rem] p-5 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Subject</label>
                                        <input 
                                            required 
                                            placeholder="What is this regarding?"
                                            className="w-full bg-[#f8f5f0] border-transparent rounded-[1.5rem] p-5 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Your Message</label>
                                        <textarea 
                                            required 
                                            rows="5"
                                            placeholder="Tell us how we can help..."
                                            className="w-full bg-[#f8f5f0] border-transparent rounded-[1.5rem] p-5 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm resize-none" 
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full btn-premium bg-[#2d3e34] text-white py-6 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.1)] transform active:scale-95 transition-all text-xl disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <><Send className="w-5 h-5 shadow-sm" /> Send Message</>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
