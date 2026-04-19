import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';


const ProductCard = ({ product }) => {

    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    return product && (
        <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} 
             className="group relative bg-white border border-gray-100 rounded-3xl p-4 premium-shadow hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden active:scale-[0.98]">
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-gray-100 text-[10px] font-black uppercase text-gray-500 rounded-full">
                    {product.category}
                </span>
            </div>

            {/* Image Container */}
            <div className="aspect-square flex items-center justify-center p-4 bg-gray-50 rounded-2xl overflow-hidden mb-5">
                <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" src={product.image[0]} alt={product.name} />
            </div>

            {/* Content */}
            <div className="space-y-3 px-1">
                <h3 className="text-gray-900 font-black text-lg truncate leading-none">
                    {product.name}
                </h3>
                
                <div className="flex items-center gap-1">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className='w-3.5' src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt='' />
                    ))}
                    <span className="text-xs text-gray-400 font-bold ml-1">(4.2)</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-primary leading-none">
                            {currency}{product.offerPrice}
                        </span>
                        <span className="text-[11px] text-gray-400 font-black line-through">
                            {currency}{product.price}
                        </span>
                    </div>

                    <div onClick={(e) => { e.stopPropagation() }}>
                        {!cartItems[product._id] ? (
                            <button 
                                className="bg-accent hover:bg-accent-dark text-gray-900 px-6 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-accent/20 transition-all hover:-translate-y-1 active:translate-y-0 cursor-pointer uppercase flex items-center gap-2" 
                                onClick={() => addToCart(product._id)} 
                            >
                                <img src={assets.add_icon} alt="add" className="w-4 h-4" />
                                ADD
                            </button>
                        ) : (
                            <div className="flex items-center bg-primary text-white p-1 rounded-xl shadow-lg shadow-primary/20 scale-105">
                                <button onClick={() => removeFromCart(product._id)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors font-black text-lg cursor-pointer">-</button>
                                <span className="w-7 text-center font-black text-sm">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors font-black text-lg cursor-pointer">+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;