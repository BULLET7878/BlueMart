import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
    isSeller,
    setShowSellerLogin,
  } = useAppContext();

  // ✅ Logout Function
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");

      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Search redirect
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Upper Navbar (Blinkit + Amazon Mix) */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 gap-4">
        {/* Logo (BluMart) */}
        <NavLink to="/" className="flex items-center gap-1 group" onClick={() => setOpen(false)}>
          <div className="flex items-center hover:opacity-80 transition-opacity">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-primary">Blu</span>
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white bg-primary px-1.5 ml-0.5 rounded-md transform -rotate-2">Mart</span>
          </div>
        </NavLink>

        {/* Location Picker (Amazon style - Cleaned up) */}
        <div className="hidden lg:flex flex-col items-start px-2 py-1 leading-tight hover:bg-gray-50 rounded-md cursor-pointer border border-transparent">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Deliver to</p>
          <div className="flex items-center gap-1 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-black text-gray-800">India</span>
          </div>
        </div>

        {/* Search Bar (Blinkit style - Prominent) */}
        <div className="flex-1 flex items-center min-w-[200px] max-w-3xl border-2 border-transparent focus-within:border-accent rounded-xl overflow-hidden transition-all duration-300">
          <div className="flex w-full overflow-hidden rounded-xl bg-gray-100/80 text-black h-11 premium-shadow border border-gray-200">
            <div className="flex items-center pl-4">
               <img src={assets.search_icon} alt="search" className="w-5 h-5 opacity-40" />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-[15px] placeholder-gray-500 font-medium bg-transparent"
              type="text"
              placeholder="Search for groceries, snacks and more"
            />
            <button 
              onClick={() => navigate("/products")}
              className="bg-accent hover:bg-accent-dark px-6 flex items-center justify-center transition-colors cursor-pointer text-gray-900 font-bold text-sm"
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* Desktop Menu (Amazon functionality, Blinkit aesthetics) */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-6">
          {/* User Section */}
          <div className="relative group px-3 py-1 leading-tight hover:bg-gray-50 rounded-md cursor-pointer border border-transparent"
               onClick={() => !user && setShowUserLogin(true)}>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Hello, {user ? user.name.split(' ')[0] : 'Log In'}</p>
            <p className="text-sm font-black flex items-center gap-1 text-gray-800">
              Account
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </p>

            {user && (
              <ul className="hidden group-hover:block absolute top-[100%] right-0 bg-white shadow-2xl border border-gray-100 py-2 w-52 rounded-xl text-black text-sm z-40 mt-2 p-1">
                <li className="px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-700 font-black border-b border-gray-100 mb-1">Your Profile</li>
                <li onClick={() => navigate("/my-orders")} className="px-4 py-2 hover:bg-primary/5 rounded-lg cursor-pointer font-medium">Orders History</li>
                <li onClick={logout} className="px-4 py-2 hover:bg-red-50 rounded-lg cursor-pointer text-red-600 font-bold border-t border-gray-100 mt-1">Sign Out</li>
              </ul>
            )}
          </div>

          {/* Cart (Blinkit style - Bright) */}
          <div
            onClick={() => navigate("/cart")}
            className="flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl cursor-pointer relative shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
             <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-3 -right-3 text-[11px] font-black bg-accent text-gray-900 border-2 border-white w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                  {getCartCount()}
                </span>
             </div>
             <span className="text-[15px] font-black hidden lg:inline tracking-tight">CART</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="sm:hidden p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
           </svg>
        </button>
      </nav>

      {/* Categories Bar (Amazon style but Light) */}
      <div className="bg-gray-50 border-b border-gray-200 flex items-center gap-6 px-4 sm:px-6 lg:px-10 py-1.5 text-[13px] font-bold text-gray-600 overflow-x-auto no-scrollbar whitespace-nowrap">
        <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer px-2 py-1 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="font-black">All Categories</span>
        </div>
        <NavLink to="/products" className="hover:text-primary transition-colors px-2 py-1">Best Sellers</NavLink>
        <NavLink to="/products" className="hover:text-primary transition-colors px-2 py-1">New Arrivals</NavLink>
        <NavLink to="/products" className="hover:text-primary transition-colors px-2 py-1">Households</NavLink>
        <NavLink to="/products" className="hover:text-primary transition-colors px-2 py-1">Personal Care</NavLink>
        <NavLink to="/products" className="ml-auto text-primary font-black animate-pulse">⚡ Special Offers</NavLink>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex" onClick={() => setOpen(false)}>
           <div className="w-[85%] max-w-[320px] bg-white h-full flex flex-col text-black shadow-2xl animate-slide-right" onClick={e => e.stopPropagation()}>
              <div className="bg-primary p-6 flex flex-col gap-4 text-white">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden bg-white/10 flex items-center justify-center">
                         <img src={assets.profile_icon} className="w-10 h-10 object-cover" alt="" />
                      </div>
                      <span className="font-black text-lg">Hello, {user ? user.name : 'Sign In'}</span>
                   </div>
                   <button onClick={() => setOpen(false)} className="text-white hover:rotate-90 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                   </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4">
                <div className="px-4 py-3 font-black text-primary text-xs uppercase tracking-widest border-b border-gray-100 mb-2">Shopping</div>
                <NavLink to="/products" className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary/5 rounded-xl font-bold" onClick={() => setOpen(false)}>
                   Best Sellers
                </NavLink>
                <NavLink to="/products" className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary/5 rounded-xl font-bold" onClick={() => setOpen(false)}>
                   New Releases
                </NavLink>
                
                <div className="px-4 py-3 font-black text-primary text-xs uppercase tracking-widest border-b border-gray-100 mt-6 mb-2">Your Account</div>
                <NavLink to="/" className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary/5 rounded-xl font-bold" onClick={() => setOpen(false)}>
                   My Profile
                </NavLink>
                <NavLink to="/my-orders" className="flex items-center gap-3 px-4 py-3.5 hover:bg-primary/5 rounded-xl font-bold" onClick={() => setOpen(false)}>
                   My Orders
                </NavLink>
                {user ? (
                   <button onClick={logout} className="w-full text-left px-4 py-3.5 hover:bg-red-50 rounded-xl text-red-600 font-black mt-2">Sign Out</button>
                ) : (
                   <button onClick={() => {setShowUserLogin(true); setOpen(false)}} className="w-full text-left px-4 py-3.5 hover:bg-primary/10 rounded-xl font-black mt-2 text-primary">Login / Create Account</button>
                )}
              </div>
           </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
