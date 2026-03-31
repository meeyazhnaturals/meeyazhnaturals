import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, ShoppingCart, ShieldCheck, Zap, Heart,
    ArrowLeft, CheckCircle2, Info, MessageSquare,
    ChevronRight, Share2, AlertCircle, Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';

export const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('benefits');
    const [selectedVariant, setSelectedVariant] = useState('500g');
    const [added, setAdded] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: product?.name || 'Meeyazh Naturals Product',
            text: product?.description || 'Check out this product from Meeyazh Naturals',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy:", err);
            }
        }
    };

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);

        const localProducts = [
            { id: 1, name: 'Power House', price: 297, oldPrice: 499, weight: '200g', rating: 5.0, reviews: 145, description: 'A nutrient-dense blend designed to fuel your body with pure goodness.', image: '/images/Power House front.png', category: 'Health Mix', ingredients: 'Almonds, Cashews, Peanuts, Brown Rice, Green Gram, Samba Wheat, Cardamom, Ginger, Bajra, Roasted Gram.', benefits: ['High protein for muscle repair', 'Sustained energy throughout the day', 'Supports brain function', 'Heart healthy fats'], nutrition: [{ label: 'Energy', value: '420 kcal' }, { label: 'Protein', value: '15g' }, { label: 'Iron', value: '9.2mg' }, { label: 'Fiber', value: '7.0g' }] },
            { id: 2, name: 'Moringa Powder', price: 150, oldPrice: 299, weight: '100g', rating: 4.8, reviews: 93, description: 'Pure, organic Moringa powder packed with vitamins and minerals for your daily boost.', image: '/images/Moringa powder .png', category: 'Health Mix', ingredients: 'Organic Moringa Oleifera Leaves.', benefits: ['Powerful immunity booster', 'Natural blood purifier', 'Anti-inflammatory properties', 'Supports liver health'], nutrition: [{ label: 'Energy', value: '340 kcal' }, { label: 'Protein', value: '10g' }, { label: 'Iron', value: '6.8mg' }, { label: 'Fiber', value: '5.5g' }] },
            { id: 3, name: 'Pirandai Powder', price: 180, oldPrice: 350, weight: '100g', rating: 4.7, reviews: 76, description: 'Traditional Pirandai powder known for its amazing health benefits and digestive support.', image: '/images/Pirandai powder.png', category: 'Health Mix', ingredients: 'Pure Pirandai (Cissus quadrangularis) Extract.', benefits: ['Supports bone health', 'Aids digestion naturally', 'Relieves joint pains', 'Natural detoxifier'], nutrition: [{ label: 'Energy', value: '310 kcal' }, { label: 'Protein', value: '8g' }, { label: 'Iron', value: '5.5mg' }, { label: 'Fiber', value: '5.0g' }] },
            { id: 4, name: 'Karuvepillai Powder', price: 170, oldPrice: 399, weight: '100g', rating: 4.9, reviews: 87, description: 'Fragrant and fresh curry leaf powder, ideal for hair health and digestive wellness.', image: '/images/Karuvepillai powder.png', category: 'Health Mix', ingredients: 'Fresh Curry Leaves, Moringa, Fenugreek, Sprouted Grains.', benefits: ['Promotes healthy hair growth', 'Supports digestive wellness', 'Rich in vitamins A and C', 'Natural detoxifier'], nutrition: [{ label: 'Energy', value: '320 kcal' }, { label: 'Protein', value: '9g' }, { label: 'Iron', value: '7.1mg' }, { label: 'Fiber', value: '6.2g' }] },
        ];


        const localProduct = localProducts.find(p => p.id === parseInt(id));
        if (localProduct) {
            setProduct(localProduct);
        } else {
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
            if (error || !data) {
                setProduct(null); // Set to null instead of localProducts[0]
            } else {
                setProduct(data);
            }
        }
        setLoading(false);
    };


    const handleAddToCart = () => {
        addToCart(product, selectedVariant);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
            <Loader2 className="w-12 h-12 text-[#5c7c64] animate-spin" />
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5f0] p-6 text-center">
            <AlertCircle className="w-16 h-16 text-[#5c7c64] mb-6 opacity-20" />
            <h2 className="font-serif text-3xl font-bold text-[#2d3e34] mb-4">Product Not Found</h2>
            <p className="text-[#2d3e34]/60 mb-8 max-w-md">This product might have been removed or the link is incorrect. We're updating our collection soon!</p>
            <button onClick={() => navigate('/')} className="px-8 py-4 bg-[#2d3e34] text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-xl hover:shadow-2xl transition-all">
                Back to Collection
            </button>
        </div>
    );

    return (
        <div className="bg-[#f8f5f0] min-h-screen pb-24 font-sans pt-8 md:pt-16">
            <div className="container mx-auto px-6">
                {/* Breadcrumbs */}
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#2d3e34]/60 hover:text-[#2d3e34] font-bold text-xs uppercase tracking-widest mb-12 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Shop
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="aspect-square rounded-[3rem] overflow-hidden bg-white shadow-2xl border-8 border-white group relative">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-6 right-6 flex flex-col gap-3">
                                <button onClick={handleShare} className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white text-[#2d3e34] transition-all transform active:scale-95">
                                    {copied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square rounded-2xl bg-white p-2 shadow-sm border border-gray-100 cursor-pointer overflow-hidden transition-all hover:border-[#5c7c64]">
                                    <img src={product.image} className="w-full h-full object-cover rounded-xl opacity-60 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col h-full"
                    >
                        <div className="space-y-2 mb-6">
                            <span className="text-[#5c7c64] font-bold uppercase tracking-widest text-[10px]">Purely Natural • Handcrafted</span>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2d3e34] leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />)}
                                    <span className="text-sm font-bold text-[#2d3e34] ml-2">{product.rating}</span>
                                </div>
                                <span className="text-xs font-bold text-[#2d3e34]/40 uppercase tracking-widest">({product.reviews} Reviews)</span>
                            </div>
                        </div>

                        <p className="text-lg text-[#2d3e34]/70 leading-relaxed mb-10 font-medium">{product.description}</p>

                        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-200">
                            <div>
                                <p className="text-[10px] font-bold text-[#2d3e34]/40 uppercase tracking-widest mb-1">Price</p>
                                <p className="text-4xl font-bold text-[#2d3e34]">₹{product.price}</p>
                            </div>
                            <div className="h-10 w-px bg-gray-200" />
                            <div className="flex gap-2">
                                {['500g', '1kg'].map(v => (
                                    <button
                                        key={v}
                                        onClick={() => setSelectedVariant(v)}
                                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border ${selectedVariant === v ? 'bg-[#2d3e34] text-white border-[#2d3e34] shadow-lg' : 'bg-white text-[#2d3e34] border-gray-100'}`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-10 text-center">
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><CheckCircle2 className="w-6 h-6" /></div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">FSSAI Certified</p>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600"><ShieldCheck className="w-6 h-6" /></div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">100% Organic</p>
                            </div>
                            <div className="space-y-2 flex flex-col items-center">
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600"><Zap className="w-6 h-6" /></div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Sprouted Superfood</p>
                            </div>
                        </div>

                        <div className="mt-auto flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-grow btn-premium p-6 text-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all ${added ? 'bg-green-600' : 'bg-[#2d3e34]'} text-white`}
                            >
                                {added ? '✓ Item Added to Cart' : '🛒 Add to My Kitchen'}
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Detailed Sections Tabs */}
                <div className="mt-32">
                    <div className="flex gap-8 border-b border-gray-200 mb-12">
                        {['benefits', 'ingredients', 'nutrition'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-6 text-sm font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-[#2d3e34]' : 'text-gray-400 hover:text-[#2d3e34]/70'}`}
                            >
                                {tab}
                                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#5c7c64] rounded-full" />}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="min-h-[200px]"
                            >
                                {activeTab === 'benefits' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {product.benefits?.map((b, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <div className="w-8 h-8 rounded-full bg-[#5c7c64]/10 flex items-center justify-center shrink-0 mt-1"><CheckCircle2 className="w-4 h-4 text-[#5c7c64]" /></div>
                                                <p className="text-xl font-medium text-[#2d3e34]/80">{b}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeTab === 'ingredients' && (
                                    <div className="flex flex-col gap-6">
                                        <p className="text-2xl font-serif font-bold text-[#2d3e34]">What's Inside:</p>
                                        <p className="text-xl leading-relaxed text-[#2d3e34]/70">{product.ingredients}</p>
                                        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-full w-fit">
                                            <AlertCircle className="w-3 h-3" /> Allergen Warning: Contains Nuts
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'nutrition' && (
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                        {product.nutrition?.map((n, i) => (
                                            <div key={i} className="p-8 bg-[#f8f5f0] rounded-3xl border border-gray-100 text-center space-y-2">
                                                <p className="text-[10px] font-bold text-[#2d3e34]/40 uppercase tracking-widest">{n.label}</p>
                                                <p className="text-3xl font-bold text-[#2d3e34]">{n.value}</p>
                                                <p className="text-[10px] font-bold text-[#5c7c64]">Per Serving</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>


            </div>


        </div>
    );
};
