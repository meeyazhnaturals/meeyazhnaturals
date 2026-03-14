import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Globe, ShieldCheck, HelpCircle } from 'lucide-react';

export const Shipping = () => {
    return (
        <div className="bg-[#f8f5f0] min-h-screen pt-32 pb-24 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-14 h-14 bg-[#f4f7f5] rounded-2xl flex items-center justify-center text-[#5c7c64]">
                            <Truck className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="font-serif text-4xl font-bold text-[#2d3e34]">Shipping Information</h1>
                            <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">Fast & Secure Delivery</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-[#f8f5f0] p-8 rounded-[2rem] border border-gray-50 bg-gradient-to-br from-[#f8f5f0] to-white transition-all hover:shadow-md">
                            <Clock className="w-8 h-8 text-[#5c7c64] mb-4" />
                            <h3 className="font-serif text-xl font-bold text-[#2d3e34] mb-2">Processing Time</h3>
                            <p className="text-[#2d3e34]/70 text-sm leading-relaxed">
                                Most orders are prepared and shipped within 1-2 business days. Handmade products may occasionally require an extra day for perfect curing and packaging.
                            </p>
                        </div>
                        <div className="bg-[#f8f5f0] p-8 rounded-[2rem] border border-gray-50 bg-gradient-to-br from-[#f8f5f0] to-white transition-all hover:shadow-md">
                            <Truck className="w-8 h-8 text-[#5c7c64] mb-4" />
                            <h3 className="font-serif text-xl font-bold text-[#2d3e34] mb-2">Delivery Estimates</h3>
                            <p className="text-[#2d3e34]/70 text-sm leading-relaxed">
                                • Within Tamil Nadu: 2-3 Days<br />
                                • Major Cities in India: 3-5 Days<br />
                                • Remote Areas: 5-7 Days
                            </p>
                        </div>
                    </div>

                    <div className="space-y-12 text-[#2d3e34]/80 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-[#5c7c64]" /> Shipping Partners
                            </h2>
                            <p>
                                We partner with India's leading logistics providers (Delhivery, BlueDart, DTDC) to ensure your wellness packages reach you safely and on time. You will receive a tracking ID via email/SMS as soon as your order is dispatched.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-[#5c7c64]" /> Delivery Locations
                            </h2>
                            <p>
                                Meeyazh Naturals ships all across India. We are currently working on enabling international shipping to bring our traditional wellness products to the global community.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <Globe className="w-5 h-5 text-[#5c7c64]" /> Shipping Charges
                            </h2>
                            <p>
                                Charges are calculated based on the weight of your order and your delivery location. We offer flat-rate premium express shipping at ₹60 to ensure the fastest possible delivery for your natural essentials.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-[#5c7c64]" /> Order Tracking
                            </h2>
                            <p>
                                Once your product is shipped, you can track its journey through the link provided in your shipping confirmation email. For any queries regarding your shipment, feel free to contact us at +91 93630 85956.
                            </p>
                        </section>

                        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-sm text-gray-400">
                                © 2026 Meeyazh Naturals • Delivering Wellness
                            </p>
                            <p className="text-sm font-bold text-[#5c7c64] uppercase tracking-[0.2em]">
                                Straight from Coimbatore
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
