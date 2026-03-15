import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios, setShowSellerLogin } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post("/api/seller/login", { email, password });
            if (data.success) {
                setIsSeller(true);
                setShowSellerLogin(false);
                navigate("/seller");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)

        }

    }

    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }
    }, [isSeller])
    return !isSeller && (
        <div
            onClick={() => {
                setShowSellerLogin(false);
                if (window.location.pathname.startsWith('/seller')) {
                    navigate('/');
                }
            }}
            className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200 bg-white'
            >
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span> Login</p>

                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email}
                        type='email' placeholder='Enter your email'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password}
                        type='password' placeholder='Enter your password'
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
                </div>
                <button className='bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer'>Login</button>

            </form>
        </div>
    )
}

export default SellerLogin