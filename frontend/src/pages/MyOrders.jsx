import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Package, ChevronRight, ArrowLeft, ShoppingBag, Clock, MapPin, Truck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const MyOrders = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) {
                if (error.code === 'PGRST116' || error.message.includes('not found')) {
                    // Table might not exist yet or no rows
                    setOrders([]);
                } else {
                    throw error;
                }
            } else {
                setOrders(data || []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
                <div className="w-12 h-12 border-4 border-[#5c7c64] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8f5f0] min-h-screen pb-24 pt-32 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Back Button */}
                <Link 
                    to="/profile" 
                    className="flex items-center gap-2 text-[#2d3e34]/60 hover:text-[#2d3e34] font-bold text-xs uppercase tracking-widest mb-12 transition-colors group w-fit"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Profile
                </Link>

                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                        <Package className="w-6 h-6 text-[#5c7c64]" />
                    </div>
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2d3e34]">My Orders</h1>
                        <p className="text-gray-400 text-sm font-medium">Manage and track your recent purchases</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-16 md:p-24 shadow-sm border border-gray-100 text-center"
                    >
                        <div className="w-24 h-24 bg-[#f8f5f0] rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="font-serif text-3xl font-bold text-[#2d3e34] mb-4">No orders yet</h2>
                        <p className="text-gray-400 text-sm mb-12 max-w-[280px] mx-auto leading-relaxed">It looks like you haven't placed any orders with us. Explore our natural wellness blends to get started!</p>
                        <Link 
                            to="/home" 
                            className="inline-block bg-[#2d3e34] text-white px-12 py-5 rounded-2xl font-bold shadow-xl hover:bg-[#1f2b24] transition-all transform active:scale-95"
                        >
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-shadow"
                            >
                                <div className="p-8 md:p-10">
                                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 pb-8 border-b border-gray-50">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</p>
                                            <p className="font-bold text-[#2d3e34] text-sm">#{order.id.slice(0, 8).toUpperCase()}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date Placed</p>
                                            <p className="font-bold text-[#2d3e34] text-sm flex items-center gap-2">
                                                <Clock className="w-3 h-3" /> {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</p>
                                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full font-bold text-[10px] uppercase tracking-wider">
                                                <Truck className="w-3 h-3" /> {order.status || 'Delivering'}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="space-y-6">
                                        {Array.isArray(order.items) && order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-6 items-center">
                                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#f8f5f0] overflow-hidden shrink-0">
                                                    <img 
                                                        src={item.image || '/images/MR Miracle.JPG'} 
                                                        alt={item.name} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <h4 className="font-bold text-sm md:text-base text-[#2d3e34] truncate">{item.name}</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                                        Quantity: {item.quantity} • {item.weight}
                                                    </p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="font-bold text-sm text-[#2d3e34]">₹{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Delivering to</p>
                                                <p className="text-xs font-medium text-[#2d3e34]/70 max-w-[240px]">
                                                    {order.shipping_address?.address}, {order.shipping_address?.city}, {order.shipping_address?.pincode}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-2 text-[#5c7c64] font-bold text-xs uppercase tracking-[0.2em] group">
                                            Order Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
