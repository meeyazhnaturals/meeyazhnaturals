import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1f2b24] text-[#f8f5f0] pt-20 pb-10 mt-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl font-bold tracking-tight">Meeyazh <span className="italic font-medium opacity-80">Naturals</span></h2>
                        <p className="text-sm opacity-70 leading-relaxed max-w-xs">
                            Dedicated to bringing you the purest wellness solutions. Purely natural, rooted in tradition, for your family's wellness.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/meeyazhnaturals?igsh=MTV5ejUwYTNoaDl6eQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-serif text-xl font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-sm opacity-70">
                            <li><Link to="/about" className="hover:opacity-100 flex items-center gap-2 group">Our Story</Link></li>
                            <li><Link to="/ingredients" className="hover:opacity-100 flex items-center gap-2 group">Ingredients</Link></li>
                            <li><Link to="/benefits" className="hover:opacity-100 flex items-center gap-2 group">Benefits</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-serif text-xl font-bold mb-6">Support</h3>
                        <ul className="space-y-4 text-sm opacity-70">
                            <li><Link to="/shipping" className="hover:opacity-100">Shipping Info</Link></li>
                            <li><Link to="/privacy" className="hover:opacity-100">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:opacity-100">Terms & Conditions</Link></li>
                            <li><Link to="/contact" className="hover:opacity-100">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-xl font-bold mb-6">Contact Us</h3>
                        <div className="space-y-4 text-sm opacity-70">
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-[#5c7c64]" />
                                <p>+91 93630 85956</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-[#5c7c64]" />
                                <p>meeyazhnaturals@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-xs opacity-50 font-medium tracking-widest uppercase">
                            copyrights by MeeyazhNaturals &copy; {currentYear}
                        </p>
                        <div className="flex gap-6 text-[10px] uppercase tracking-widest opacity-40 font-bold">
                            <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms and condition</Link>
                            <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
