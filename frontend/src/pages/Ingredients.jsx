import React from 'react';

export const Ingredients = () => {
    return (
        <div className="bg-[#fcfaf7] min-h-screen pt-32 pb-20 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="mb-16 text-center">
                    <h1 className="font-serif text-5xl font-bold text-[#2d3e34] mb-6">Our Ingredients</h1>
                    <p className="text-lg text-[#2d3e34]/70 leading-relaxed max-w-3xl mx-auto">
                        At Meeyazh Naturals, we believe customers deserve full clarity about what they use and consume. Our products are made using carefully selected natural ingredients known for their traditional use and everyday wellness support.
                    </p>
                </header>

                <div className="space-y-16">
                    {/* Introduction */}
                    <section className="text-center bg-white p-8 rounded-[2rem] shadow-sm">
                        <p className="text-lg text-[#2d3e34]/80">
                            We focus on clean sourcing, minimal processing, and simple formulations without unnecessary additives.
                        </p>
                    </section>

                    {/* Core Ingredients */}
                    <section>
                        <h2 className="font-serif text-3xl font-bold text-[#2d3e34] mb-8 border-b border-[#2d3e34]/10 pb-4">Core Ingredients We Use</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🍎 Apple (ABC Mix)</h3>
                                <p className="text-[#2d3e34]/70">Naturally rich in antioxidants and fiber. Traditionally used to support digestion and overall wellness.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🥕 Carrot (ABC Mix)</h3>
                                <p className="text-[#2d3e34]/70">Known for beta-carotene content and commonly used to support skin and eye health.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">❤️ Beetroot (ABC Mix)</h3>
                                <p className="text-[#2d3e34]/70">Often used for its iron and antioxidant content and for supporting energy levels.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🌿 Tulsi (Basil Bliss)</h3>
                                <p className="text-[#2d3e34]/70">Traditionally valued for immunity support and respiratory wellness.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🍊 Orange Peel (Citrus Glow)</h3>
                                <p className="text-[#2d3e34]/70">Naturally rich in vitamin C and commonly used in skincare for brightening and gentle exfoliation.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🍃 Curry Leaves</h3>
                                <p className="text-[#2d3e34]/70">Traditionally used for hair care and digestion support.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🌺 Hibiscus</h3>
                                <p className="text-[#2d3e34]/70">Widely used for hair strength, scalp care, and skin nourishment.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🌿 Moringa (Mr. Miracle)</h3>
                                <p className="text-[#2d3e34]/70">Nutrient-dense leaf traditionally used for overall wellness and daily nutrition.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🌱 Neem (Neemmune)</h3>
                                <p className="text-[#2d3e34]/70">Known for antibacterial properties and widely used in skincare and hair care routines.</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#2d3e34]">🌹 Rose</h3>
                                <p className="text-[#2d3e34]/70">Traditionally used for skin soothing and cooling effects.</p>
                            </div>
                        </div>
                    </section>

                    {/* Health Mix Ingredients */}
                    <section>
                        <h2 className="font-serif text-3xl font-bold text-[#2d3e34] mb-8 border-b border-[#2d3e34]/10 pb-4">Health Mix Ingredients</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🥜 Almonds</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Source of healthy fats and nutrients for sustained energy.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🌰 Cashew Nuts</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Naturally rich in minerals and supports daily nourishment.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🥜 Peanuts</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Commonly used as a protein-rich ingredient for energy support.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🌾 Brown Rice</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Provides complex carbohydrates for steady energy.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🌱 Green Gram</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Traditionally used for digestion-friendly nutrition.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🌾 Samba Wheat</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Known for fiber content and daily nourishment.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🌿 Bajra (Pearl Millet)</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Commonly used for sustained energy and digestive support.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🌰 Roasted Gram</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Used as a protein and fiber-rich ingredient.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🌿 Cardamom</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Traditionally used for digestion and aroma.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-[#2d3e34]">🌿 Ginger</h3>
                                <p className="text-[#2d3e34]/70 text-sm">Known for digestive support and warming properties.</p>
                            </div>
                        </div>
                    </section>

                    {/* Care Ingredients */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <section>
                            <h2 className="font-serif text-2xl font-bold text-[#2d3e34] mb-6 border-b border-[#2d3e34]/10 pb-2">Personal Care Ingredients</h2>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-[#2d3e34]">⚫ Activated Charcoal</h3>
                                    <p className="text-[#2d3e34]/70 text-sm">Commonly used for deep cleansing and oil control.</p>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-[#2d3e34]">🍅 Tomato Extract</h3>
                                    <p className="text-[#2d3e34]/70 text-sm">Traditionally used for skin clarity and brightness.</p>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-[#2d3e34]">🌿 Kuppaimeni</h3>
                                    <p className="text-[#2d3e34]/70 text-sm">Used in traditional skincare for soothing support.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl font-bold text-[#2d3e34] mb-6 border-b border-[#2d3e34]/10 pb-2">Oral Care Ingredients</h2>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-[#2d3e34]">⚫ Charcoal (Tooth Powder)</h3>
                                    <p className="text-[#2d3e34]/70 text-sm">Commonly used for stain removal and oral freshness.</p>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-[#2d3e34]">🌿 Herbal Blend (Tooth Powder)</h3>
                                    <p className="text-[#2d3e34]/70 text-sm">Includes traditional herbs used for gum care and oral hygiene support.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Promise */}
                    <section className="bg-[#2d3e34] text-white p-12 rounded-[3rem] shadow-xl">
                        <h2 className="font-serif text-3xl font-bold mb-8 text-center text-[#5c7c64]">Our Ingredient Promise</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="flex items-center gap-3">
                                <span className="text-[#5c7c64] font-bold">✔</span>
                                <span className="font-medium">No artificial colors</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#5c7c64] font-bold">✔</span>
                                <span className="font-medium">No harsh chemicals</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#5c7c64] font-bold">✔</span>
                                <span className="font-medium">Minimal processing</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#5c7c64] font-bold">✔</span>
                                <span className="font-medium">Carefully selected raw materials</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#5c7c64] font-bold">✔</span>
                                <span className="font-medium">Clean and hygienic preparation</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
