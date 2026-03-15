const NewsLetter = () => {
    
    return (
        <section className="mt-32 pb-24">
            <div className="bg-amazon-blue rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                {/* Visual Interest */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Never Miss a <span className="text-accent italic">Great Deal!</span></h2>
                    <p className="text-gray-400 font-medium md:text-lg mb-10">
                        Join 50,000+ shoppers and get the latest offers, new arrivals, and exclusive discounts delivered to your inbox.
                    </p>
                    
                    <form className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-2 rounded-2xl md:rounded-[2rem] border border-white/10 backdrop-blur-sm shadow-inner group transition-all focus-within:border-accent/40" onSubmit={e => e.preventDefault()}>
                        <div className="flex-1 w-full relative">
                            <input
                                className="w-full bg-transparent border-none outline-none px-6 py-4 text-white font-medium placeholder-gray-500"
                                type="email"
                                placeholder="Enter your email address..."
                                required
                            />
                        </div>
                        <button type="submit" className="w-full sm:w-auto px-10 py-4 text-gray-900 bg-accent hover:bg-accent-dark transition-all duration-300 font-black rounded-xl md:rounded-2xl cursor-pointer shadow-lg shadow-accent/20 active:scale-95">
                            SUBSCRIBE NOW
                        </button>
                    </form>
                    
                    <p className="mt-6 text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em]">We respect your privacy. No spam, ever.</p>
                </div>
            </div>
        </section>
    )
}

export default NewsLetter;