import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, ChevronDown, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';


export const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("Newest");

    useEffect(() => {
        fetchProducts();
    }, [sortBy]);

    const fetchProducts = async () => {
        setLoading(true);

        const localProducts = [
            { id: 1, name: 'Power House', price: 297, oldPrice: 499, weight: '200g', rating: 5.0, description: 'A nutrient-dense blend designed to fuel your body with pure goodness.', image: '/images/Power House front.png', category: 'Health Mix' },
            { id: 2, name: 'Moringa Powder', price: 150, oldPrice: 299, weight: '100g', rating: 4.8, description: 'Pure, organic Moringa powder packed with vitamins and minerals for your daily boost.', image: '/images/Moringa powder .png', category: 'Health Mix' },
            { id: 3, name: 'Pirandai Powder', price: 180, oldPrice: 350, weight: '100g', rating: 4.7, description: 'Traditional Pirandai powder known for its amazing health benefits and digestive support.', image: '/images/Pirandai powder.png', category: 'Health Mix' },
            { id: 4, name: 'Karuvepillai Powder', price: 170, oldPrice: 399, weight: '100g', rating: 4.9, description: 'Fragrant and fresh curry leaf powder, ideal for hair health and digestive wellness.', image: '/images/Karuvepillai powder.png', category: 'Health Mix' },
        ];

        let filtered = localProducts;

        if (sortBy === "Price: Low to High") filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === "Price: High to Low") filtered.sort((a, b) => b.price - a.price);

        setProducts(filtered);
        setLoading(false);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#f8f5f0] min-h-screen pb-24 pt-16 md:pt-20">
            {/* Shop Content area */}
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Shop View */}
                    <div className="flex-1 w-full">
                        {/* Search & Mobile Filter Bar */}
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                            <div className="relative flex-grow group w-full">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#5c7c64] transition-colors w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name, ingredient, or benefit..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-gray-100 rounded-[2rem] py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#5c7c64]/5 transition-all outline-none shadow-sm text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{filteredProducts.length} items</span>
                            </div>
                        </div>


                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-32">
                                <Loader2 className="w-12 h-12 text-[#5c7c64] animate-spin mb-4" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {!loading && filteredProducts.length === 0 && (
                            <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-gray-100">
                                <p className="font-serif text-2xl text-gray-400">We couldn't find what you're looking for.</p>
                                <button onClick={() => { setSearchQuery(""); }} className="mt-6 text-[#5c7c64] font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8">View all products</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
