import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';


export const LandingPage = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("Newest");

    const heroImages = [
        '/images/Power House front.png',
        '/images/Moringa powder .png',
        '/images/Pirandai powder.png',
        '/images/Karuvepillai powder.png'
    ];

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
                                <button onClick={() => { setSearchQuery(""); }} className="mt-6 text-[#5c7c64] font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8">View all products</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* End Added Shop Content from Home */}
        </div>
    );
};
