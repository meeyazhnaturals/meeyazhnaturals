import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Scale, HelpCircle } from 'lucide-react';

export const Terms = () => {
    return (
        <div className="bg-[#f8f5f0] min-h-screen pt-32 pb-24 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#f8f5f0] rounded-2xl flex items-center justify-center text-[#5c7c64]">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif text-4xl font-bold text-[#2d3e34]">Terms & Conditions</h1>
                            <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">Last Updated: March 2026</p>
                        </div>
                    </div>

                    <div className="space-y-12 text-[#2d3e34]/80 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <Shield className="w-5 h-5 text-[#5c7c64]" /> 1. Introduction
                            </h2>
                            <p>
                                Welcome to Meeyazh Naturals. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <Scale className="w-5 h-5 text-[#5c7c64]" /> 2. Use of Website
                            </h2>
                            <p>
                                All content provided on this website is for informational purposes only. You must be at least 18 years old to use this website or have parental/guardian consent. We reserve the right to modify or discontinue the service without notice at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#5c7c64]" /> 3. Product Information
                            </h2>
                            <p>
                                We strive to ensure all product descriptions and prices are accurate. However, errors may occur. Meeyazh Naturals products are natural and handmade, which means minor variations in color, texture, and aroma are normal and not considered defects. 
                            </p>
                            <p className="mt-4 italic">
                                Note: Our health and wellness products are not intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before starting any new dietary supplement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#5c7c64]" /> 4. Orders and Payments
                            </h2>
                            <p>
                                By placing an order, you agree to provide current, complete, and accurate purchase and account information. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase or errors in product/pricing information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#5c7c64]" /> 5. Shipping and Delivery
                            </h2>
                            <p>
                                Delivery times are estimates and not guarantees. We are not responsible for delays caused by shipping carriers or unforeseen circumstances. Please ensure your delivery address is accurate to avoid complications.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-[#5c7c64]" /> 6. Privacy Policy
                            </h2>
                            <p>
                                Your submission of personal information through the store is governed by our Privacy Policy. We respect your data and use it only to fulfill your orders and improve your shopping experience.
                            </p>
                        </section>

                        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-sm text-gray-400">
                                © 2026 Meeyazh Naturals. All Rights Reserved.
                            </p>
                            <p className="text-sm font-bold text-[#5c7c64]">
                                Questions? contact@meeyazh.com
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
