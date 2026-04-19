import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {

    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();

    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id);

    // ✅ FIXED ERROR → relatedProducts was missing
    const relatedProducts = products.filter(
        (item) =>
            item.category === product?.category &&
            item._id !== product?._id
    );

    useEffect(() => {
        if (product && product.image && product.image.length > 0) {
            setThumbnail(product.image[0]);
        }
    }, [product]);

    return product ? (
        <div className="mt-12 pb-24 animate-fade-in-up">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <Link to={`/product-category/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">{product.category}</Link>
                <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                {/* Left: Image Gallery */}
                <div className="xl:flex-1 flex flex-col md:flex-row gap-6">
                    <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto no-scrollbar">
                        {product.image.map((image, index) => (
                            <div 
                                key={index} 
                                onClick={() => setThumbnail(image)} 
                                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl p-2 border-2 transition-all cursor-pointer overflow-hidden bg-gray-50 flex items-center justify-center ${thumbnail === image ? 'border-primary shadow-lg shadow-primary/10' : 'border-gray-100 opacity-60 hover:opacity-100'}`}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 order-1 md:order-2 bg-gray-50 rounded-[2.5rem] border border-gray-100 premium-shadow flex items-center justify-center p-8 md:p-12 overflow-hidden aspect-square md:aspect-auto md:h-[600px] group">
                        <img src={thumbnail} alt="Selected product" className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                    </div>
                </div>

                {/* Right: Product Info & Purchase Card */}
                <div className="w-full lg:w-[450px] xl:w-[500px]">
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                                {product.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">{product.name}</h1>
                            
                            <div className="flex items-center gap-2 mt-4">
                                <div className="flex items-center gap-0.5">
                                    {Array(5).fill('').map((_, i) => (
                                        <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" className="w-4" />
                                    ))}
                                </div>
                                <p className="text-sm font-black text-gray-400 ml-1">4.0 <span className="font-medium">(1.2k Reviews)</span></p>
                            </div>
                        </div>

                        {/* Description Box */}
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                           <p className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3">About this item</p>
                           <ul className="space-y-3">
                                {product.description.map((desc, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-600 font-medium text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Purchase Card (Glassmorphic) */}
                        <div className="glass-card p-8 rounded-[2.5rem] mt-10">
                            <div className="flex items-end gap-3 mb-8">
                                <p className="text-4xl font-black text-primary leading-none">{currency}{product.offerPrice}</p>
                                <p className="text-lg text-gray-400 font-bold line-through leading-none pb-0.5">{currency}{product.price}</p>
                                <span className="mb-1 text-[10px] font-black text-green-500 uppercase">Save {Math.round(((product.price - product.offerPrice)/product.price)*100)}%</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => addToCart(product._id)} 
                                    className="premium-button py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-black rounded-2xl text-sm"
                                >
                                    ADD TO CART
                                </button>
                                <button 
                                    onClick={() => { addToCart(product._id); navigate("/cart"); scrollTo(0,0); }} 
                                    className="premium-button py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl text-sm"
                                >
                                    BUY NOW
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                                       <img src={assets.delivery_truck_icon} className="w-5 h-5 opacity-60" alt="" />
                                    </div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase leading-tight">Fast<br/>Delivery</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                                       <img src={assets.leaf_icon} className="w-5 h-5 opacity-60" alt="" />
                                    </div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase leading-tight">100%<br/>Organic</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                                       <img src={assets.trust_icon} className="w-5 h-5 opacity-60" alt="" />
                                    </div>
                                    <span className="text-[9px] font-black text-gray-400 uppercase leading-tight">Quality<br/>Tested</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-32">
                <div className="flex items-center justify-between border-b-2 border-primary/10 pb-6 mb-12">
                   <div>
                      <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Related <span className="text-primary italic">Products</span></h2>
                      <p className="text-gray-500 font-medium mt-1">You might also like these fresh finds</p>
                   </div>
                   <button onClick={()=>{navigate('/products'); scrollTo(0,0)}} className="hidden sm:flex items-center gap-2 text-primary font-black text-sm hover:translate-x-1 transition-transform cursor-pointer">
                        VIEW ALL 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                   </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:grid-cols-5 mt-6 w-full px-1">
                    {relatedProducts.filter((product)=>product.inStock).slice(0, 5).map((product,index)=>(
                        <ProductCard key={index} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    ) : <div className="mt-32 text-center flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Fetching Details...</p>
        </div>;
};

export default ProductDetail;
