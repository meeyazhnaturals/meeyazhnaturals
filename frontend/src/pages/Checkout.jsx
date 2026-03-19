import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import {
    ChevronRight, MapPin, Truck,
    ShieldCheck, Lock, ShoppingBag, ArrowLeft,
    CheckCircle2, CreditCard as CardIcon, Phone,
    Mail, User, Home, Zap
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import { supabase } from '../lib/supabase';

export const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        fname: '',
        lname: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        state: ''
    });
    const [savedProfile, setSavedProfile] = useState(null);
    const [useSavedAddress, setUseSavedAddress] = useState(false);

    React.useEffect(() => {
        const fetchProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                
                if (profile) {
                    setSavedProfile(profile);
                    setUseSavedAddress(true);
                    const nameParts = profile.full_name?.split(' ') || [];
                    setFormData(prev => ({
                        ...prev,
                        email: session.user.email || '',
                        fname: nameParts[0] || '',
                        lname: nameParts.slice(1).join(' ') || '',
                        phone: profile.phone || '',
                        address: profile.address || '',
                        city: profile.city || '',
                        pincode: profile.pincode || '',
                        state: profile.state || ''
                    }));
                }
            }
        };
        fetchProfile();
    }, []);

    const toggleAddressSource = (source) => {
        if (source === 'saved') {
            setUseSavedAddress(true);
            const nameParts = savedProfile.full_name?.split(' ') || [];
            setFormData({
                ...formData,
                fname: nameParts[0] || '',
                lname: nameParts.slice(1).join(' ') || '',
                phone: savedProfile.phone || '',
                address: savedProfile.address || '',
                city: savedProfile.city || '',
                pincode: savedProfile.pincode || '',
                state: savedProfile.state || ''
            });
        } else {
            setUseSavedAddress(false);
            setFormData({
                ...formData,
                fname: '',
                lname: '',
                phone: '',
                address: '',
                city: '',
                pincode: '',
                state: ''
            });
        }
    };

    const displayRazorpay = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            const orderDetails = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
            const addressString = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
            
            const res = await fetch(`${apiUrl}/api/payment/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: finalTotal,
                    name: `${formData.fname} ${formData.lname}`,
                    email: formData.email,
                    phone: formData.phone,
                    address: addressString,
                    details: orderDetails
                })
            });
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Failed to create payment order');
            }
            
            // Load Razorpay script
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onerror = () => {
                alert('Razorpay SDK failed to load. Are you online?');
            };
            script.onload = () => {
                try {
                    const options = {
                        key: data.key,
                        amount: data.amount,
                        currency: data.currency,
                        name: "Meeyazh Naturals",
                        description: "Order Payment",
                        order_id: data.id,
                        method: 'upi',
                        handler: function (response) {
                            handleFinalize(response.razorpay_payment_id, data.id);
                        },
                        prefill: {
                            name: `${formData.fname || ''} ${formData.lname || ''}`.trim(),
                            email: formData.email || "test@example.com",
                            contact: formData.phone ? `+91${String(formData.phone).replace(/[^0-9]/g, '').slice(-10)}` : "+919999999999",
                            method: 'upi'
                        },
                        theme: {
                            color: "#2d3e34"
                        },
                        modal: {
                            confirm_close: true
                        }
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();
                } catch (err) {
                    console.error("Error setting up Razorpay options:", err);
                    alert("Payment configuration failed. Please try again.");
                }
            };
            document.body.appendChild(script);
        } catch (error) {
            console.error("Payment initiation failed", error);
            alert("Failed to initiate payment. Please try again.");
        }
    };

    if (cart.length === 0 && step < 4) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <ShoppingBag className="w-16 h-16 text-gray-200 mb-6" />
                <h1 className="font-serif text-3xl font-bold text-[#2d3e34] mb-4">Your cart is Empty</h1>
                <p className="text-gray-400 text-sm mb-10 max-w-[280px]">Explore our natural collections and add wellness to your routine.</p>
                
                <Link 
                    to="/login" 
                    className="w-full max-w-[320px] bg-[#5c7c64] text-white py-5 rounded-[1.5rem] font-bold shadow-lg hover:bg-[#4a6452] transition-all transform active:scale-95 mb-12"
                >
                    Continue Shopping
                </Link>

                <div className="pt-8 border-t border-gray-100 w-full max-w-[320px]">
                    <p className="text-sm text-gray-400 font-medium mb-1">Have an account?</p>
                    <Link 
                        to="/login" 
                        className="text-[#2d3e34] font-bold text-sm hover:underline underline-offset-4"
                    >
                        "Login" to check out faster
                    </Link>
                </div>
            </div>
        );
    }

    const handleNext = (e) => {
        if (e) e.preventDefault();
        setStep(step + 1);
        window.scrollTo(0, 0);
    };

    const renderActions = () => {
        switch (step) {
            case 1:
                return (
                    <button 
                        type="submit" 
                        form="checkout-form"
                        className="w-full btn-premium bg-[#2d3e34] text-white py-6 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.1)] transform active:scale-95 transition-all text-xl"
                    >
                        Continue to Shipping <ChevronRight className="w-5 h-5" />
                    </button>
                );
            case 2:
                return (
                    <div className="flex gap-4">
                        <button onClick={() => setStep(1)} className="w-1/3 border border-gray-200 py-6 rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-white transition-all">Back</button>
                        <button onClick={() => setStep(3)} className="w-2/3 btn-premium bg-[#2d3e34] text-white py-6 flex items-center justify-center gap-3">Continue to Payment <ChevronRight className="w-5 h-5" /></button>
                    </div>
                );
            case 3:
                return (
                    <div className="flex gap-4">
                        <button onClick={() => setStep(2)} className="w-1/3 border border-gray-200 py-6 rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-white transition-all">Back</button>
                        <button onClick={displayRazorpay} className="w-2/3 btn-premium bg-[#5c7c64] text-white py-6 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(92,124,100,0.3)] transform active:scale-95 transition-all text-xl">Pay with Razorpay <Lock className="w-5 h-5" /></button>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleFinalize = async (paymentId, razorpayOrderId) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session?.user) {
                const orderData = {
                    user_id: session.user.id,
                    items: cart,
                    total_amount: finalTotal,
                    shipping_address: {
                        ...formData,
                        name: `${formData.fname} ${formData.lname}`
                    },
                    status: 'Processing',
                    payment_id: paymentId,
                    razorpay_order_id: razorpayOrderId,
                    created_at: new Date()
                };

                const { error } = await supabase
                    .from('orders')
                    .insert([orderData]);

                if (error) {
                    console.error("Error saving order:", error.message);
                }
            }
            
            setStep(4);
            clearCart();
        } catch (err) {
            console.error("Critical error during finalization:", err);
            setStep(4);
            clearCart();
        }
    };

    const shippingCharge = 60;
    const finalTotal = cartTotal + shippingCharge;

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center gap-4 mb-20">
            {[1, 2, 3].map(i => (
                <React.Fragment key={i}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${step >= i ? 'bg-[#2d3e34] text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
                        {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
                    </div>
                    {i < 3 && <div className={`h-[2px] w-12 rounded-full transition-all ${step > i ? 'bg-[#2d3e34]' : 'bg-gray-200'}`} />}
                </React.Fragment>
            ))}
        </div>
    );

    if (step === 4) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#f8f5f0] p-6 text-center">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-8 shadow-inner">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2d3e34] mb-6">Order Placed Successfully!</h1>
                <p className="text-[#2d3e34]/60 mb-12 max-w-md mx-auto leading-relaxed">Thank you for choosing Meeyazh Naturals. Your journey to holistic health has just begun. We'll send you a confirmation email shortly.</p>
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm max-w-sm w-full mb-12">
                    <div className="flex justify-between items-center mb-4 text-sm font-bold opacity-60 uppercase tracking-widest">
                        <span>Order Number</span>
                        <span className="text-[#2d3e34]">#MYZ-89234</span>
                    </div>
                    <div className="w-full h-px bg-gray-50 mb-4" />
                    <p className="text-xs text-gray-400 mb-6">A digital invoice has been sent to your email.</p>
                    <Link to="/home" className="w-full btn-premium bg-[#2d3e34] text-white py-5 block">Back to Shop</Link>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="bg-[#f8f5f0] min-h-screen pb-32 pt-32">
            <div className="container mx-auto px-6 max-w-6xl">

                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="flex-grow">
                        {renderStepIndicator()}

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.form
                                    key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleNext}
                                    id="checkout-form"
                                    className="space-y-10"
                                >
                                    <div>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                            <h2 className="font-serif text-4xl font-bold text-[#2d3e34]">Shipping Information</h2>
                                            
                                            {savedProfile && (
                                                <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm w-fit">
                                                    <button 
                                                        type="button"
                                                        onClick={() => toggleAddressSource('saved')}
                                                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${useSavedAddress ? 'bg-[#2d3e34] text-white shadow-md' : 'text-gray-400 hover:text-[#2d3e34]'}`}
                                                    >
                                                        Saved Address
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => toggleAddressSource('manual')}
                                                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${!useSavedAddress ? 'bg-[#2d3e34] text-white shadow-md' : 'text-gray-400 hover:text-[#2d3e34]'}`}
                                                    >
                                                        Manual Entry
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">First Name</label>
                                                <input 
                                                    required 
                                                    value={formData.fname}
                                                    onChange={(e) => setFormData({...formData, fname: e.target.value})}
                                                    className="w-full bg-white border border-gray-100 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Last Name</label>
                                                <input 
                                                    required 
                                                    value={formData.lname}
                                                    onChange={(e) => setFormData({...formData, lname: e.target.value})}
                                                    className="w-full bg-white border border-gray-100 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Phone Number</label>
                                                <input 
                                                    required 
                                                    type="tel" 
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                    className="w-full bg-white border border-gray-100 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                                    placeholder="Contact info"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Street address</label>
                                                <input 
                                                    required 
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                                    className="w-full bg-white border border-gray-100 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                                    placeholder="Complete delivery address"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Town / City</label>
                                                <input 
                                                    required 
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                                                    className="w-full bg-white border border-gray-100 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] ml-2">Pincode</label>
                                                <input 
                                                    required 
                                                    value={formData.pincode}
                                                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                                                    className="w-full bg-white border border-gray-100 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-[#5c7c64]/5 outline-none transition-all shadow-sm" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.form>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <div>
                                        <h2 className="font-serif text-3xl font-bold text-[#2d3e34] mb-8">Shipping Method</h2>
                                        <div className="space-y-4">
                                            <div className="bg-white border-2 border-[#2d3e34] rounded-[2rem] p-8 flex items-center justify-between shadow-lg">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 bg-[#f8f5f0] rounded-full flex items-center justify-center text-[#2d3e34]"><Truck className="w-6 h-6" /></div>
                                                    <div>
                                                        <h4 className="font-bold text-[#2d3e34]">Premium Express</h4>
                                                        <p className="text-sm text-[#2d3e34]/50">3-5 Business Days</p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-lg">₹{shippingCharge}</span>
                                            </div>
                                            <div className="bg-white/50 border border-gray-100 rounded-[2rem] p-8 flex items-center justify-between opacity-50 cursor-not-allowed">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 bg-[#f8f5f0] rounded-full flex items-center justify-center text-gray-400"><ShoppingBag className="w-6 h-6" /></div>
                                                    <div>
                                                        <h4 className="font-bold">Standard Delivery</h4>
                                                        <p className="text-sm">7-10 Business Days</p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-lg">Free</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <div>
                                        <h2 className="font-serif text-3xl font-bold text-[#2d3e34] mb-8">Secure Payment</h2>
                                        <div className="bg-white border-2 border-[#2d3e34] rounded-[2rem] p-8 flex items-center justify-between shadow-lg">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-[#f8f5f0] rounded-full flex items-center justify-center text-[#2d3e34]"><Lock className="w-6 h-6" /></div>
                                                <div>
                                                    <h4 className="font-bold text-[#2d3e34]">Razorpay Secure</h4>
                                                    <p className="text-sm text-[#2d3e34]/50">Pay via UPI, Cards, Wallets, or NetBanking</p>
                                                </div>
                                            </div>
                                            <div className="flex bg-[#2d3e34] text-white px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase">Razorpay</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Actions for Desktop */}
                        <div className="hidden lg:block mt-20">
                            {renderActions()}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-[400px] shrink-0">
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 lg:sticky lg:top-32">
                            <h3 className="font-serif text-2xl font-bold text-[#2d3e34] mb-8">Order Summary</h3>
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 no-scrollbar mb-8">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gray-50 overflow-hidden shrink-0 shadow-sm"><img src={item.image} className="w-full h-full object-cover" /></div>
                                        <div className="flex-grow min-w-0">
                                            <h4 className="font-bold text-xs truncate">{item.name}</h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity} • {item.weight}</p>
                                        </div>
                                        <p className="font-bold text-sm tracking-tight text-[#2d3e34]">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full h-px bg-gray-50 mb-8" />
                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Subtotal</span>
                                    <span className="font-bold text-[#2d3e34]">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Shipping</span>
                                    <span className="font-bold text-[#2d3e34]">₹{shippingCharge}</span>
                                </div>
                                <div className="pt-4 flex justify-between items-center border-t border-gray-50 mt-4">
                                    <span className="text-lg font-bold text-[#2d3e34]">Total</span>
                                    <span className="text-3xl font-bold text-[#2d3e34] tracking-tighter">₹{finalTotal}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions for Mobile */}
                        <div className="block lg:hidden mt-8 mb-12">
                            {renderActions()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
