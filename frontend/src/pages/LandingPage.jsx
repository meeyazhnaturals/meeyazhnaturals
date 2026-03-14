import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

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




    const nextSlide = () => setActiveSlide((prev) => (prev + 1) % heroImages.length);
    const prevSlide = () => setActiveSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

    return (
        <div className="bg-[#fcfaf7] min-h-screen overflow-x-hidden pt-20 md:pt-24 font-sans focus-visible:outline-none">
            {/* The "First Look" Hero - Clean Image Slider like the reference */}
            <section className="px-4 md:px-8 mb-20 relative">
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

                        {/* Elegant Arrows (Matching the reference circle style) */}
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

            {/* Themed Sections */}
            <section className="container mx-auto px-6 py-20 space-y-32">
                {/* Family Theme */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <img src="/images/Family Theme.PNG" alt="Family Theme" className="w-full h-auto rounded-xl md:rounded-3xl shadow-2xl object-cover" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2d3e34]">Nourish Your Family's Health</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Discover the secrets of traditional wellness tailored for every generation. Our carefully curated blends ensure that your loved ones receive nature's finest nutrients, promoting vitality and longevity.
                        </p>
                        <button onClick={() => navigate('/login')} className="inline-block bg-[#5c7c64] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2d3e34] transition-colors shadow-lg">
                            View Products
                        </button>
                    </div>
                </div>

                {/* College Theme */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <img src="/images/College Theme.PNG" alt="College Theme" className="w-full h-auto rounded-xl md:rounded-3xl shadow-2xl object-cover" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2d3e34]">Fuel Your Campus Life</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Stay energized through long lectures and late-night study sessions. Our organic, easy-to-prepare mixes provide the perfect balance of brain-boosting nutrition and sustaining energy for active students.
                        </p>
                        <button onClick={() => navigate('/login')} className="inline-block bg-[#5c7c64] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2d3e34] transition-colors shadow-lg">
                            View Products
                        </button>
                    </div>
                </div>

                {/* Multi Theme */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <img src="/images/Multi Theme.PNG" alt="Multi Theme" className="w-full h-auto rounded-xl md:rounded-3xl shadow-2xl object-cover" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2d3e34]">Holistic Nutrition for All</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            A versatile approach to modern diet dilemmas. Blending ancient grains and powerful superfoods, our signature multi-theme collection adapts to your dynamic lifestyle, delivering uncompromising purity.
                        </p>
                        <button onClick={() => navigate('/login')} className="inline-block bg-[#5c7c64] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2d3e34] transition-colors shadow-lg">
                            View Products
                        </button>
                    </div>
                </div>

                {/* Soap Bars Theme */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <img src="/images/Soap Bars.PNG" alt="Handcrafted Soap Bars" className="w-full h-auto rounded-xl md:rounded-3xl shadow-2xl object-cover" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2d3e34]">Nature's Gentle Cleanse</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Elevate your daily routine with our handcrafted soap bars. Gently formulated with pure botanical extracts, they cleanse and nourish your skin, keeping it naturally glowing and deeply moisturized.
                        </p>
                        <button onClick={() => navigate('/login')} className="inline-block bg-[#5c7c64] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2d3e34] transition-colors shadow-lg">
                            View Products
                        </button>
                    </div>
                </div>
            </section>





        </div>
    );
};
