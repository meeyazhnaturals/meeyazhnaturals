import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, ChevronRight, ArrowUpRight, LogOut, UserPlus, LogIn, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

export const Navbar = () => {
    const { cart, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Get initial user
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            if (event === 'SIGNED_OUT') {
                clearCart();
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setIsMenuOpen(false);
        navigate('/');
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        setIsMenuOpen(false);
    };

    // Lock body scroll when menu or cart is open
    React.useEffect(() => {
        if (isMenuOpen || isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen, isCartOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsCartOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled
                ? 'bg-white shadow-sm border-b border-gray-100 py-1'
                : 'bg-[#fcfaf7] py-2'
                }`}
        >
            <div className="container mx-auto px-6 h-16 md:h-20 flex justify-between items-center relative z-20">
                {/* Left: Hamburger */}
                <div className="flex-1 flex items-center">
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                        className="text-gray-500 hover:text-[#5c7c64] transition-colors p-2 -ml-2 transform active:scale-90"
                    >
                        <Menu className="w-6 h-6 md:w-7 h-7" />
                    </button>
                </div>

                {/* Center: Brand Name (Neater, Smaller) */}
                <Link
                    to={user ? "/home" : "/"}
                    onClick={() => { setIsMenuOpen(false); setIsCartOpen(false); }}
                    className="flex flex-col items-center group"
                >
                    <h1 className="font-serif text-xl md:text-3xl font-bold tracking-tight text-[#2d3e34] leading-none flex items-center gap-1 group-hover:scale-[1.02] transition-transform">
                        Meeyazh <span className="text-[#5c7c64] font-normal italic">Naturals</span>
                    </h1>
                </Link>

                {/* Right: Cart */}
                <div className="flex-1 flex justify-end items-center gap-4">
                    {user ? (
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/profile" className="text-gray-400 hover:text-[#5c7c64] transition-colors" title="My Profile">
                                <User className="w-5 h-5 md:w-6 md:h-6" />
                            </Link>
                            <button onClick={handleSignOut} className="text-gray-400 hover:text-red-500 transition-colors" title="Sign Out">
                                <LogOut className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden md:flex items-center text-gray-400 hover:text-[#5c7c64] transition-colors">
                            <User className="w-5 h-5 md:w-6 md:h-6" />
                        </Link>
                    )}

                    <button
                        onClick={toggleCart}
                        aria-label="Open Cart"
                        className="text-gray-700 hover:text-[#5c7c64] transition-colors relative p-2 transform active:scale-95"
                    >
                        <ShoppingBag className="w-6 h-6 md:w-7 h-7 stroke-[1.8]" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 bg-[#5c7c64] text-white text-[8px] md:text-[9px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[110]"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: '-100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="fixed top-0 left-0 w-full max-w-[280px] md:max-w-xs bg-white z-[120] flex flex-col h-screen shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-50 bg-[#f8f5f0]/30 h-16 md:h-20">
                                <h2 className="font-serif text-lg md:text-xl font-bold text-[#2d3e34]">Navigation</h2>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col flex-grow px-6 py-6 overflow-y-auto">
                                {[
                                    { name: 'Shop All', path: '/home' },
                                    { name: 'Ingredients', path: '/ingredients' },
                                    { name: 'Our Story', path: '/about' },
                                    { name: 'Benefits', path: '/benefits' },
                                ].filter(link => {
                                    const hideShopAll = ['/', '/login', '/signup'].includes(location.pathname);
                                    return !(link.name === 'Shop All' && hideShopAll);
                                }).map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="py-5 border-b border-gray-50 flex items-center justify-between group"
                                    >
                                        <span className="font-sans text-base md:text-lg font-medium text-[#2d3e34] group-hover:text-[#5c7c64]">
                                            {link.name}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-gray-200" />
                                    </Link>
                                ))}
                            </div>

                            <div className="p-6 mt-auto border-t border-gray-50 bg-gray-50/50">
                                {user ? (
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center justify-between w-full p-5 bg-white rounded-[1.5rem] shadow-sm group hover:bg-red-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                                            <span className="font-bold text-sm">Sign Out</span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-gray-300" />
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-5 bg-white rounded-[1.5rem] shadow-sm group">
                                            <div className="flex items-center gap-3">
                                                <User className="w-5 h-5 text-gray-400 group-hover:text-[#5c7c64] transition-colors" />
                                                <span className="font-bold text-sm">Sign In</span>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-gray-300" />
                                        </Link>

                                        {location.pathname === '/' && (
                                            <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-5 bg-[#5c7c64] text-white rounded-[1.5rem] shadow-sm group hover:bg-[#4a6452] transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <UserPlus className="w-5 h-5 text-white/80" />
                                                    <span className="font-bold text-sm">Sign Up</span>
                                                </div>
                                                <ArrowUpRight className="w-4 h-4 text-white/50" />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[110]"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="fixed top-0 right-0 w-full max-w-[400px] bg-white z-[120] flex flex-col h-screen shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-50 bg-[#f8f5f0]/30 h-16 md:h-20">
                                <h2 className="font-serif text-lg md:text-xl font-bold text-[#2d3e34]">Your Cart</h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {cart.length === 0 ? (
                                <div className="flex flex-col flex-grow items-center justify-center px-10 py-12 text-center overflow-y-auto no-scrollbar">
                                    <ShoppingBag className="w-16 h-16 text-gray-200 mb-6 shrink-0" />
                                    <h3 className="font-serif text-2xl font-bold text-[#2d3e34] mb-4 shrink-0">Your cart is Empty</h3>
                                    <p className="text-gray-400 text-sm mb-10 max-w-[240px] shrink-0">Explore our natural collections and add wellness to your routine.</p>

                                    <Link
                                        to="/login"
                                        onClick={() => setIsCartOpen(false)}
                                        className="w-full bg-[#5c7c64] text-white py-5 rounded-[1.5rem] font-bold shadow-lg hover:bg-[#4a6452] transition-all transform active:scale-95 mb-12 shrink-0 text-center"
                                    >
                                        Continue Shopping
                                    </Link>

                                    {!user && (
                                        <div className="pt-8 border-t border-gray-50 w-full shrink-0">
                                            <p className="text-sm text-gray-400 font-medium mb-1">Have an account?</p>
                                            <span className="text-sm text-gray-500">
                                                <Link
                                                    to="/login"
                                                    onClick={() => setIsCartOpen(false)}
                                                    className="text-blue-600 font-bold hover:underline underline-offset-4"
                                                >
                                                    Login
                                                </Link> to check out faster
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
                                        {cart.map((item) => (
                                            <motion.div
                                                key={`${item.id}-${item.variant || ''}`}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 50 }}
                                                className="flex gap-4 items-center bg-[#f8f5f0]/50 rounded-2xl p-3 border border-gray-100"
                                            >
                                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-50 overflow-hidden shrink-0 shadow-sm">
                                                    <img
                                                        src={item.image || '/images/MR Miracle.JPG'}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <h4 className="font-bold text-sm text-[#2d3e34] truncate">{item.name}</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">{item.weight}</p>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                                                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#2d3e34] hover:text-white hover:border-[#2d3e34] transition-all"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm font-bold text-[#2d3e34] w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                                                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#2d3e34] hover:text-white hover:border-[#2d3e34] transition-all"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 shrink-0">
                                                    <span className="font-bold text-sm text-[#2d3e34]">₹{item.price * item.quantity}</span>
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.variant)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                                        title="Remove item"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Cart Footer */}
                                    <div className="border-t border-gray-100 p-6 space-y-4 bg-white shrink-0">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400 font-medium">Subtotal</span>
                                            <span className="text-xl font-bold text-[#2d3e34]">₹{cartTotal}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-400">Shipping & taxes calculated at checkout</p>
                                        <Link
                                            to="/checkout"
                                            onClick={() => setIsCartOpen(false)}
                                            className="w-full bg-[#2d3e34] text-white py-4 rounded-[1.5rem] font-bold shadow-lg hover:bg-[#1e2e24] transition-all transform active:scale-95 flex items-center justify-center gap-2 text-center"
                                        >
                                            Checkout <ChevronRight className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsCartOpen(false)}
                                            className="w-full text-center text-sm text-gray-400 hover:text-[#5c7c64] font-medium transition-colors block py-2"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </>
                            )}

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

