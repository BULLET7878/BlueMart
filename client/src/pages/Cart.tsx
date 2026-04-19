import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
    setShowUserLogin,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [utrNumber, setUtrNumber] = useState("");

  const getCart = () => {
    console.log("Cart Items: ", cartItems);
    const tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      console.log("Product for key ", key, ": ", product);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get", {
        params: { userId: user._id },
      });

      if (data.success) {
        setAddresses(data.addresses);

        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select a delivery address");
      }
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/order-placed");
        } else {
          toast.error(data.message);
        }
      } else if (paymentOption === "UPI") {
        if (!utrNumber) {
          return toast.error("Please enter the UTR number for verification");
        }
        const { data } = await axios.post("/api/order/upi", {
          userId: user._id,
          items: cartArray.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
          utrNumber: utrNumber
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/order-placed");
        } else {
          toast.error(data.message);
        }
      } else {
        //place order with stripe

        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      (async () => {
        getUserAddress();
      })();
    }
  }, [user]);

  // const [showAddress, setShowAddress] = useState(false)

  return products.length > 0 && cartItems ? (
    <div className="mt-16 pb-24">
      {/* Header with Progress (Simple for now) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Shopping <span className="text-primary italic">Cart</span></h1>
          <p className="text-gray-500 font-medium mt-1">Review your items and checkout with ease.</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm font-black text-gray-500">
           <span>{getCartCount()} ITEMS</span>
           <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
           <span className="text-primary">{currency}{getCartAmount()}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Column: Item List */}
        <div className="flex-1 w-full space-y-6">
          {cartArray.length > 0 ? (
            cartArray.map((product, index) => (
              <div key={index} className="group relative bg-white border border-gray-100 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in-up" 
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Image with background */}
                  <div 
                    onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0); }}
                    className="cursor-pointer w-32 h-32 flex-shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-100 group-hover:scale-105 transition-transform overflow-hidden"
                  >
                    <img className="max-w-full h-full object-contain" src={product.image[0]} alt={product.name} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 mt-2">
                       <span className="text-sm font-bold text-gray-400">Weight: <span className="text-gray-600">{product.weight || "N/A"}</span></span>
                       <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                       <span className="text-sm font-bold text-gray-400">Category: <span className="text-gray-600 uppercase">{product.category}</span></span>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-6">
                       <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                          <button onClick={() => removeFromCart(product._id)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all font-black text-lg cursor-pointer">-</button>
                          <span className="w-10 text-center font-black text-sm">{cartItems[product._id]}</span>
                          <button onClick={() => addToCart(product._id)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all font-black text-lg cursor-pointer">+</button>
                       </div>
                       <button onClick={() => updateCartItem(product._id, 1)} className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest cursor-pointer underline underline-offset-4">Reset Qty</button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-center sm:items-end gap-4 min-w-[120px]">
                     <p className="text-2xl font-black text-gray-900 leading-none">{currency}{product.offerPrice * product.quantity}</p>
                     <p className="text-sm text-gray-400 font-bold line-through leading-none">{currency}{product.price * product.quantity}</p>
                     <button 
                        onClick={() => removeFromCart(product._id)}
                        className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                        title="Remove Item"
                      >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                       </svg>
                     </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-[3rem] py-20 px-6 text-center animate-fade-in-up">
               <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
               </div>
               <h2 className="text-2xl font-black text-gray-900">Your cart is lonely</h2>
               <p className="text-gray-500 font-medium mt-2 mb-10">Add some fresh items to kickstart your day!</p>
               <button onClick={() => { navigate('/products'); scrollTo(0,0) }} className="px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all cursor-pointer">START SHOPPING</button>
            </div>
          )}
          
          <button
            onClick={() => { navigate("/products"); scrollTo(0, 0); }}
            className="flex items-center justify-center sm:justify-start gap-3 text-primary font-black hover:translate-x-2 transition-transform cursor-pointer group uppercase tracking-widest text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </button>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="w-full lg:w-[400px] lg:sticky lg:top-32">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-accent"></div>
            
            <h2 className="text-2xl font-black text-gray-900 mb-8">Order Summary</h2>
            
            <div className="space-y-6">
              {/* Delivery Section */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Delivery To</p>
                   <button onClick={() => setShowAddress(!showAddress)} className="text-[10px] font-black text-primary uppercase cursor-pointer hover:underline">Change</button>
                </div>
                <div className="relative">
                  <p className="text-sm font-bold text-gray-800 leading-relaxed">
                    {selectedAddress
                      ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                      : "Set your delivery location"}
                  </p>
                  
                  {showAddress && (
                    <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden p-1 animate-fade-in-up">
                      {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <p key={index}
                             onClick={() => { setSelectedAddress(address); setShowAddress(false); }}
                             className="text-xs font-bold text-gray-600 p-3 hover:bg-primary/5 hover:text-primary rounded-xl cursor-pointer transition-colors"
                          >
                            {address.street}, {address.city}
                          </p>
                        ))
                      ) : (
                        <p className="p-3 text-xs text-gray-400 text-center font-medium">No saved addresses</p>
                      )}
                      <Link to="/add-address" onClick={(e) => { if (!user) { e.preventDefault(); setShowUserLogin(true); toast.error("Please login first"); } }}
                            className="block p-3 text-center text-[10px] font-black text-primary bg-primary/5 hover:bg-primary/10 transition-colors uppercase tracking-widest border-t border-gray-50"
                      >
                        + Add New Address
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Payment Method</p>
                <div className="grid grid-cols-2 gap-2">
                   <button onClick={() => setPaymentOption("COD")} 
                           className={`py-3 px-2 rounded-xl text-[10px] font-black transition-all ${paymentOption === "COD" ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100 hover:border-primary/30"}`}>
                      CASH ON DELIVERY
                   </button>
                    <button onClick={() => setPaymentOption("Online")} 
                            className={`py-3 px-2 rounded-xl text-[10px] font-black transition-all ${paymentOption === "Online" ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100 hover:border-primary/30"}`}>
                       ONLINE PAYMENT
                    </button>
                    <button onClick={() => setPaymentOption("UPI")} 
                            className={`py-3 px-2 col-span-2 rounded-xl text-[10px] font-black transition-all ${paymentOption === "UPI" ? "bg-primary text-white shadow-lg" : "bg-white text-gray-500 border border-gray-100 hover:border-primary/30"}`}>
                       UPI PAYMENT ({import.meta.env.VITE_UPI_ID})
                    </button>
                 </div>
                 {paymentOption === "UPI" && (
                   <div className="mt-4 space-y-3 animate-fade-in-up">
                     <p className="text-[10px] font-bold text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
                       Pay to <span className="text-primary font-black">{import.meta.env.VITE_UPI_ID}</span> then enter your 12-digit UTR number below for manual verification.
                     </p>
                     <div className="flex justify-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <img src={assets.upi_qr} alt="UPI QR" className="w-48 h-auto rounded-xl shadow-lg border-2 border-white" />
                     </div>
                     <input 
                       type="text" 
                       placeholder="Enter UTR / Transaction ID" 
                       value={utrNumber}
                       onChange={(e) => setUtrNumber(e.target.value)}
                       className="w-full p-4 text-xs font-bold border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                     />
                   </div>
                 )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-400">Merchant Subtotal</span>
                  <span className="text-gray-900">{currency}{getCartAmount()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-400">Order Tax (2%)</span>
                  <span className="text-gray-900">{currency}{(getCartAmount() * 2) / 100}</span>
                </div>
                <div className="flex justify-between pt-5 border-t border-gray-100 text-xl font-black">
                  <span className="text-gray-900">Total</span>
                  <span className="text-primary">{currency}{getCartAmount() + (getCartAmount() * 2) / 100}</span>
                </div>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={cartArray.length === 0}
              className="w-full mt-10 py-5 bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-black rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer text-lg tracking-tight"
            >
              {paymentOption === "COD" ? "COMPLETE ORDER" : "PROCEED TO PAYMENT"}
            </button>
            <p className="mt-4 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Secure checkout powered by BluMart</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
