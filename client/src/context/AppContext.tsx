/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = ""; // Empty string for relative paths in Vercel Monorepo

export interface AppContextType {
  navigate: any;
  user: any;
  setUser: any;
  isSeller: boolean;
  setIsSeller: any;
  showUserLogin: boolean;
  setShowUserLogin: any;
  showSellerLogin: boolean;
  setShowSellerLogin: any;
  products: any[];
  currency: string;
  addToCart: (itemId: string) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  cartItems: Record<string, number>;
  searchQuery: string;
  setSearchQuery: any;
  getCartCount: () => number;
  getCartAmount: () => number;
  axios: any;
  fetchProducts: () => Promise<void>;
  setCartItems: any;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showSellerLogin, setShowSellerLogin] = useState(false);
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");

      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      toast.error("Failed to fetch seller data: ", error);
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user?.cartItems);
      }
    } catch (error) {
      toast.error("Failed to fetch user data: ", error);
      setUser(null);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addToCart = (itemId: string) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId: string, quantity: number) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId: string) => {
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);
      toast.success("Item Removed");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }

    console.log("Total Cart Amount: ", totalAmount);
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchUser();
      await fetchSeller();
      await fetchProducts();
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const { data } = await axios.post("/api/cart/update", {
            userId: user._id,
            cartItems,
          });
          console.log("Cart update response: ", data);

          if (!data.success) {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      })();
    } else {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    showSellerLogin,
    setShowSellerLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
