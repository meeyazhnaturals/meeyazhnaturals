import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, PackageSearch, Truck, CheckCircle2, Clock, Eye, X, Mail, Phone, MapPin } from 'lucide-react';

export const AdminPanel = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [navigate]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching orders:", error);
            } else {
                setOrders(data || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) {
                alert('Failed to update status: ' + error.message);
            } else {
                fetchOrders(); // Refresh
                if (selectedOrder && selectedOrder.id === orderId) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
                <div className="w-12 h-12 border-4 border-[#5c7c64] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f5f0] font-sans pb-24">
            {/* Admin Header */}
            <div className="bg-[#2d3e34] text-white pt-8 pb-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <span className="text-white/60 font-bold text-[10px] uppercase tracking-[0.3em]">Meeyazh Naturals</span>
                            <h1 className="text-2xl md:text-3xl font-serif font-bold mt-1">Admin Control Center</h1>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm transition-colors text-white"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/10 rounded-2xl p-6 border border-white/5">
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Total Orders</p>
                            <p className="text-3xl font-bold">{orders.length}</p>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-6 border border-white/5">
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Pending</p>
                            <p className="text-3xl font-bold">{orders.filter(o => !o.status || o.status === 'Processing').length}</p>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-6 border border-white/5">
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Shipped</p>
                            <p className="text-3xl font-bold">{orders.filter(o => o.status === 'Shipped').length}</p>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-6 border border-white/5">
                            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Delivered</p>
                            <p className="text-3xl font-bold">{orders.filter(o => o.status === 'Delivered').length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="container mx-auto max-w-6xl px-6 -mt-20">
                <div className="bg-white rounded-[3rem] shadow-xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                            <PackageSearch className="w-6 h-6 text-orange-500" />
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-[#2d3e34]">Recent Orders</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-gray-100">
                                    <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#2d3e34]/50">Order ID</th>
                                    <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#2d3e34]/50">Date</th>
                                    <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#2d3e34]/50">Amount</th>
                                    <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-[#2d3e34]/50">Status</th>
                                    <th className="pb-4 text-right text-[10px] font-bold uppercase tracking-widest text-[#2d3e34]/50">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-6 shrink-0">
                                            <p className="font-bold text-[#2d3e34] text-xs">#{order.id.slice(0, 8).toUpperCase()}</p>
                                        </td>
                                        <td className="py-6">
                                            <p className="text-xs font-medium text-[#2d3e34]/70">
                                                {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </td>
                                        <td className="py-6">
                                            <p className="text-sm font-bold text-[#5c7c64]">₹{order.total_amount}</p>
                                        </td>
                                        <td className="py-6">
                                            <select 
                                                value={order.status || 'Processing'} 
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                className={`text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#5c7c64] border-0 cursor-pointer ${
                                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-orange-100 text-orange-700'
                                                }`}
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="py-6 text-right">
                                            <button 
                                                onClick={() => setSelectedOrder(order)}
                                                className="bg-[#f8f5f0] text-[#2d3e34] hover:bg-[#2d3e34] hover:text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2"
                                            >
                                                <Eye className="w-3 h-3" /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-gray-400 font-medium">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl"
                    >
                        <div className="sticky top-0 bg-white/80 backdrop-blur-md p-6 border-b border-gray-100 flex justify-between items-center z-10">
                            <div>
                                <h3 className="font-serif font-bold text-2xl text-[#2d3e34]">Order Details</h3>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">#{selectedOrder.id.slice(0,8).toUpperCase()}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d3e34]/50 mb-4">Shipping Info</p>
                                    <div className="bg-[#f8f5f0] p-5 rounded-2xl space-y-3">
                                        <p className="font-bold text-[#2d3e34] text-sm">{selectedOrder.shipping_address?.name}</p>
                                        <div className="flex items-start gap-2 text-xs text-gray-500 font-medium">
                                            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                            <p>{selectedOrder.shipping_address?.address}, {selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state} - {selectedOrder.shipping_address?.pincode}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                            <Phone className="w-4 h-4 shrink-0" />
                                            <p>{selectedOrder.shipping_address?.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d3e34]/50 mb-4">Payment Info</p>
                                    <div className="bg-[#f8f5f0] p-5 rounded-2xl space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500 font-bold uppercase">Total Amount</span>
                                            <span className="text-lg font-bold text-[#5c7c64]">₹{selectedOrder.total_amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-gray-200/50 pt-3">
                                            <span className="text-xs text-gray-500 font-bold uppercase">Payment ID</span>
                                            <span className="text-[10px] font-bold font-mono text-gray-600 bg-gray-200 px-2 py-1 rounded">{selectedOrder.payment_id || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d3e34]/50 mb-4">Order Items</p>
                                <div className="space-y-4">
                                    {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 items-center bg-white border border-gray-100 p-4 rounded-2xl">
                                            <div className="w-16 h-16 rounded-xl bg-[#f8f5f0] overflow-hidden shrink-0">
                                                <img src={item.image || '/images/MR Miracle.JPG'} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-sm text-[#2d3e34]">{item.name}</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                                    Qty: {item.quantity} • {item.weight}
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="font-bold text-sm text-[#2d3e34]">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
