import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { User, MapPin, Phone, Save, Loader2, LogOut, Package, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        state: ''
    });

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                navigate('/login');
                return;
            }

            const { user } = session;
            setUser(user);

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, phone, address, city, pincode, state`)
                .eq('id', user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setProfile(data);
            }
        } catch (error) {
            console.error('Error loading user data!', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const { data: { session } } = await supabase.auth.getSession();
            const { user } = session;

            const updates = {
                id: user.id,
                ...profile,
                updated_at: new Date(),
            };

            let { error } = await supabase.from('profiles').upsert(updates);

            if (error) throw error;
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Error updating the data!');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
                <Loader2 className="w-12 h-12 text-[#5c7c64] animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-[#f8f5f0] min-h-screen pb-24 pt-12 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Back Button */}
                <Link 
                    to="/home" 
                    className="flex items-center gap-2 text-[#2d3e34]/60 hover:text-[#2d3e34] font-bold text-xs uppercase tracking-widest mb-12 transition-colors group w-fit"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    <ShoppingBag className="w-4 h-4" /> Back to Cart
                </Link>

                <div className="flex flex-col md:flex-row gap-12 items-start">
                    
                    {/* Left Sidebar */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-[#f8f5f0] rounded-full flex items-center justify-center mb-6">
                                <User className="w-12 h-12 text-[#5c7c64]" />
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-[#2d3e34] leading-tight mb-1">
                                {profile.full_name || 'My Profile'}
                            </h2>
                            <p className="text-gray-400 text-sm mb-8">{user?.email}</p>
                            
                            <div className="w-full space-y-2">
                                <button className="w-full px-6 py-4 bg-[#f8f5f0] rounded-2xl flex items-center gap-4 text-[#5c7c64] font-bold text-sm transition-all group">
                                    <User className="w-5 h-5" /> Account Details
                                </button>
                                <button className="w-full px-6 py-4 hover:bg-[#f8f5f0] rounded-2xl flex items-center gap-4 text-gray-400 hover:text-[#5c7c64] font-bold text-sm transition-all group">
                                    <Package className="w-5 h-5" /> My Orders
                                </button>
                                <button 
                                    onClick={handleSignOut}
                                    className="w-full px-6 py-4 hover:bg-red-50 rounded-2xl flex items-center gap-4 text-gray-400 hover:text-red-500 font-bold text-sm transition-all group mt-4"
                                >
                                    <LogOut className="w-5 h-5" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 w-full">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100"
                        >
                            <h1 className="font-serif text-3xl font-bold text-[#2d3e34] mb-12">Account Settings</h1>
                            
                            <form onSubmit={updateProfile} className="space-y-10">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] mb-6 flex items-center gap-2">
                                        <User className="w-3 h-3" /> Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                                            <input 
                                                value={profile.full_name}
                                                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                                placeholder="Enter delivery person name"
                                                className="w-full bg-[#f8f5f0] border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#5c7c64] outline-none transition-all" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input 
                                                    value={profile.phone}
                                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                    placeholder="Contact info"
                                                    className="w-full bg-[#f8f5f0] border-transparent rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-[#5c7c64] outline-none transition-all" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-50">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5c7c64] mb-6 flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> Delivery Address
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Street Address</label>
                                            <textarea 
                                                value={profile.address}
                                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                placeholder="Complete delivery address"
                                                rows="3"
                                                className="w-full bg-[#f8f5f0] border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#5c7c64] outline-none transition-all resize-none" 
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">City</label>
                                                <input 
                                                    value={profile.city}
                                                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                                    className="w-full bg-[#f8f5f0] border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#5c7c64] outline-none transition-all" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pincode</label>
                                                <input 
                                                    value={profile.pincode}
                                                    onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                                                    className="w-full bg-[#f8f5f0] border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#5c7c64] outline-none transition-all" 
                                                />
                                            </div>
                                            <div className="col-span-2 lg:col-span-1 space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">State</label>
                                                <input 
                                                    value={profile.state}
                                                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                                                    className="w-full bg-[#f8f5f0] border-transparent rounded-2xl p-4 focus:ring-2 focus:ring-[#5c7c64] outline-none transition-all" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={saving}
                                    className="w-full btn-premium bg-[#2d3e34] text-white py-6 flex items-center justify-center gap-3 shadow-xl transform active:scale-95 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <><Save className="w-5 h-5" /> Save Changes</>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
