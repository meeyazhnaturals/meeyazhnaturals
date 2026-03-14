import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle, Mail, Database } from 'lucide-react';

export const Privacy = () => {
    return (
        <div className="bg-[#f8f5f0] min-h-screen pt-32 pb-24 font-sans">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#f4f7f5] rounded-2xl flex items-center justify-center text-[#5c7c64]">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif text-4xl font-bold text-[#2d3e34]">Privacy Policy</h1>
                            <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">Your Privacy Matters to Us</p>
                        </div>
                    </div>

                    <div className="space-y-12 text-[#2d3e34]/80 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <Database className="w-5 h-5 text-[#5c7c64]" /> 1. Information Collection
                            </h2>
                            <p>
                                We collect information you provide directly to us when you create an account, make a purchase, or contact us. This may include your name, email address, phone number, shipping address, and payment details.
                            </p>
                            <p className="mt-4">
                                Additionally, we automatically collect certain technical data like your IP address, browser type, and device information to improve our website performance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#5c7c64]" /> 2. How We Use Your Data
                            </h2>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>To process and deliver your orders efficiently.</li>
                                <li>To provide personalized product recommendations.</li>
                                <li>To communicate order updates and respond to inquiries.</li>
                                <li>To enhance the security of our website and prevent fraud.</li>
                                <li>To send promotional information (only if you opt-in).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <Shield className="w-5 h-5 text-[#5c7c64]" /> 3. Data Protection
                            </h2>
                            <p>
                                We implement industry-standard security measures, including SSL encryption, to protect your personal data. Your sensitive payment information is processed securely through authorized payment gateways and is never stored on our servers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <Eye className="w-5 h-5 text-[#5c7c64]" /> 4. Third-Party Sharing
                            </h2>
                            <p>
                                Meeyazh Naturals does not sell or trade your personal information. We only share necessary data with trusted partners (like courier services and payment processors) who help us operate our business and serve you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <Lock className="w-5 h-5 text-[#5c7c64]" /> 5. Your Rights
                            </h2>
                            <p>
                                You have the right to access, update, or delete your personal information at any time. You can manage these settings through your account profile or by contacting our support team directly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#2d3e34] mb-4 flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#5c7c64]" /> 6. Contact Us
                            </h2>
                            <p>
                                If you have any questions or concerns about this Privacy Policy, please reach out to our team at:
                            </p>
                            <p className="mt-4 font-bold text-[#5c7c64]">
                                meeyazhnaturals@gmail.com<br />
                                +91 93630 85956
                            </p>
                        </section>

                        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-sm text-gray-400 italic">
                                Last Updated: March 13, 2026
                            </p>
                            <p className="text-xs text-gray-300">
                                © Meeyazh Naturals • Secure & Natural
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
