import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';

const CATEGORIES = ["All", "Health Mix", "Tooth Powder", "Bath Powder", "Soap Bar"];

export const LandingPage = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("Newest");

    const heroImages = [
        '/images/ABC Mix.PNG',
        '/images/Basil Bliss Mix.PNG',
        '/images/Citrus Glow Mix.PNG',
        '/images/Curry Leaf Mix.PNG',
        '/images/Hibiscus Mix.PNG',
        '/images/MR Miracle Mix.PNG',
        '/images/Neemmune Mix.PNG',
        '/images/Power House Mix.PNG',
        '/images/Rose Rush Mix.PNG'
    ];

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, sortBy]);

    const fetchProducts = async () => {
        setLoading(true);

        const localProducts = [
            { id: 1, name: 'ABC Mix', price: 595, oldPrice: 799, weight: '200g', rating: 4.8, description: 'Natural iron booster with apple, beetroot, and carrot.', image: '/images/ABC Mix.PNG', category: 'Health Mix' },
            { id: 2, name: 'Basil Bliss Mix', price: 212, oldPrice: 499, weight: '200g', rating: 4.9, description: 'Soothing blend with holy basil and sprouted millets.', image: '/images/Basil Bliss Mix.PNG', category: 'Health Mix' },
            { id: 3, name: 'Curry Leaf Mix', price: 170, oldPrice: 399, weight: '200g', rating: 4.8, description: 'Superfood powder for hair and digestive health.', image: '/images/Curry Leaf Mix.PNG', category: 'Health Mix' },
            { id: 4, name: 'Hibiscus Mix', price: 297, oldPrice: 499, weight: '200g', rating: 4.6, description: 'Refreshing detox blend with hibiscus and spices.', image: '/images/Hibiscus Mix.PNG', category: 'Health Mix' },
            { id: 5, name: 'MR Miracle Mix', price: 255, oldPrice: 499, weight: '200g', rating: 4.7, description: 'Traditional multi-grain health mix for the family.', image: '/images/MR Miracle Mix.PNG', category: 'Health Mix' },
            { id: 6, name: 'Neemmune Mix', price: 399, oldPrice: 799, weight: '200g', rating: 4.7, description: 'Immunity boosting neem blend.', image: '/images/Neemmune Mix.PNG', category: 'Health Mix' },
            { id: 7, name: 'Power House Mix', price: 297, oldPrice: 499, weight: '200g', rating: 5.0, description: 'Ultimate energy blend for active lifestyles.', image: '/images/Power House Mix.PNG', category: 'Health Mix' },
            { id: 8, name: 'Rose Rush Mix', price: 340, oldPrice: 599, weight: '200g', rating: 4.8, description: 'Calming and aromatic rose mix.', image: '/images/Rose Rush Mix.PNG', category: 'Health Mix' },
            { id: 9, name: 'Charcoal Tooth Powder', price: 150, oldPrice: 299, weight: '50g', rating: 4.7, description: 'Activated charcoal tooth powder for deep cleansing and whitening.', image: '/images/Charcoal Tooth Powder.PNG', category: 'Tooth Powder' },
            { id: 10, name: 'Herbal Tooth Powder', price: 130, oldPrice: 249, weight: '50g', rating: 4.8, description: 'Traditional herbal tooth powder for strong gums and fresh breath.', image: '/images/Herbal Tooth Powder.PNG', category: 'Tooth Powder' },
            { id: 11, name: 'Flowrain Bath Powder', price: 199, oldPrice: 399, weight: '100g', rating: 4.9, description: 'Natural bath powder with aromatic florals for soft and glowing skin.', image: '/images/Flowrain Bath Powder.PNG', category: 'Bath Powder' },
            { id: 12, name: 'Lavender Bath Salt', price: 249, oldPrice: 499, weight: '150g', rating: 5.0, description: 'Calming lavender bath salt to relax your muscles and soothe your senses.', image: '/images/Lavender Bath Salt.PNG', category: 'Bath Powder' },
            { id: 13, name: 'Potato Soap Bar', price: 145, oldPrice: 249, weight: '100g', rating: 4.8, description: 'Natural brightening soap bar made with fresh potato extracts to reduce dark spots.', image: '/images/Potato Soap Bar.PNG', category: 'Soap Bar' },
            { id: 14, name: 'Tomato Soap Bar', price: 145, oldPrice: 249, weight: '100g', rating: 4.7, description: 'Refresh your skin with tomato extracts for a natural glow and tanning removal.', image: '/images/Tomato Soap Bar.PNG', category: 'Soap Bar' },
            { id: 15, name: 'Kuppainmeni Soap Bar', price: 165, oldPrice: 299, weight: '100g', rating: 4.9, description: 'Traditional herbal soap bar with Kuppainmeni extracts for treating skin infections and allergies.', image: '/images/Kuppaimeni Soap Bar.PNG', category: 'Soap Bar' },
        ];

        let filtered = localProducts;
        if (selectedCategory !== "All") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        if (sortBy === "Price: Low to High") filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === "Price: High to Low") filtered.sort((a, b) => b.price - a.price);

        setProducts(filtered);
        setLoading(false);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const nextSlide = () => setActiveSlide((prev) => (prev + 1) % heroImages.length);
    const prevSlide = () => setActiveSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

    return (
        <div className="bg-[#fcfaf7] min-h-screen overflow-x-hidden font-sans focus-visible:outline-none">
            {/* The "First Look" Hero - Clean Image Slider like the reference */}
            <section className="px-4 md:px-8 mb-10 relative pt-16 md:pt-20">
                <div className="max-w-7xl mx-auto group">
                    <div className="relative aspect-[4/5] md:aspect-[21/9] bg-white md:bg-transparent rounded-sm md:rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeSlide}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                src={heroImages[activeSlide]}
                                className="w-full h-full object-cover md:object-contain"
                                alt="Modern Wellness"
                            />
                        </AnimatePresence>

                        {/* Elegant Arrows */}
                        <div className="absolute inset-y-0 left-4 md:left-10 flex items-center">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 md:w-16 md:h-16 bg-white/95 rounded-full flex items-center justify-center shadow-xl hover:bg-white transition-all transform hover:scale-105 active:scale-90"
                            >
                                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-black stroke-[1.5]" />
                            </button>
                        </div>
                        <div className="absolute inset-y-0 right-4 md:right-10 flex items-center">
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 md:w-16 md:h-16 bg-white/95 rounded-full flex items-center justify-center shadow-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95"
                            >
                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-black stroke-[1.5]" />
                            </button>
                        </div>

                        {/* Minimal Indicator dots */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                            {heroImages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveSlide(i)}
                                    className={`w-2 h-2 rounded-full border border-white/50 transition-all ${activeSlide === i ? 'bg-white scale-125' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Added Shop Content from Home */}
            <div className="container mx-auto px-6 max-w-7xl pb-24">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="flex-1 w-full">
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

                        <div className="flex overflow-x-auto gap-3 pb-8 no-scrollbar">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`whitespace-nowrap px-8 py-3 md:px-10 md:py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-[#2d3e34] text-white shadow-xl' : 'bg-white text-[#2d3e34]/50 border border-gray-100 hover:border-[#2d3e34]/20 hover:text-[#2d3e34]'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

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
                                            <ProductCard product={product} isLanding={true} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {!loading && filteredProducts.length === 0 && (
                            <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-gray-100">
                                <p className="font-serif text-2xl text-gray-400">We couldn't find what you're looking for.</p>
                                <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="mt-6 text-[#5c7c64] font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8">View all products</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* End Added Shop Content from Home */}
        </div>
    );
};
