import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Check, ArrowRight, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = React.useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full"
        >
            <Link to={`/product/${product.id}`} className="block relative aspect-square md:aspect-[4/5] overflow-hidden">
                <img
                    src={product.image || '/images/MR Miracle.JPG'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {product.discount && (
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#5c7c64] text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
                        -{product.discount}%
                    </div>
                )}

            </Link>

            <div className="p-3 md:p-6 lg:p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-1 md:mb-2">
                    <Link to={`/product/${product.id}`} className="hover:text-[#5c7c64] transition-colors flex-grow min-w-0">
                        <h3 className="font-serif text-sm md:text-xl font-bold text-[#2d3e34] line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-0.5 md:gap-1 text-yellow-500 shrink-0 ml-2">
                        <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                        <span className="text-[10px] md:text-sm font-bold">{product.rating}</span>
                    </div>
                </div>

                <p className="hidden md:block text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                <div className="md:hidden mb-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.weight}</p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                        <span className="text-base md:text-2xl font-bold text-[#2d3e34]">₹{product.price}</span>
                        {product.oldPrice && (
                            <span className="text-[10px] md:text-sm text-gray-400 line-through">₹{product.oldPrice}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.weight}</span>
                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${added ? 'bg-green-600 text-white' : 'bg-[#2d3e34] text-white hover:bg-[#5c7c64]'}`}
                        >
                            {added ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                        </button>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};
