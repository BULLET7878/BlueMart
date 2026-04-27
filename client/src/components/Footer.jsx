import { footerLinks } from "../assets/assets";

const Footer = () => {
    
    return (
        <footer className="mt-24 border-t border-gray-100 bg-gray-50/50">
            <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
                    <div className="max-w-md">
                        <div className="flex items-center gap-1 mb-6">
                            <span className="text-2xl font-black tracking-tighter text-primary">Blu</span>
                            <span className="text-2xl font-black tracking-tighter text-white bg-primary px-1.5 ml-0.5 rounded-md transform -rotate-2">Mart</span>
                        </div>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            BluMart is your destination for the freshest groceries and snacks, delivered with speed and care. We're committed to quality, affordability, and a shopping experience that fits your modern lifestyle.
                        </p>
                        <div className="flex gap-4 mt-8">
                            {/* Social Media Placeholders - High Fidelity */}
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-[11px]">{section.title}</h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a href={link.url} className="text-gray-500 font-medium hover:text-primary transition-all text-sm hover:translate-x-1 inline-block">{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* New Newsletter Section in Footer */}
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl max-w-sm">
                        <h3 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-[11px]">Join the family</h3>
                        <p className="text-gray-500 text-xs font-medium mb-6">Get exclusive deals and healthy tips every week.</p>
                        <div className="flex flex-col gap-3">
                            <input type="email" placeholder="Email address" className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/30 transition-all font-medium" />
                            <button className="bg-primary text-white font-black py-3 rounded-xl text-xs tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">SUBSCRIBE</button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-400 font-medium text-sm">
                        © {new Date().getFullYear()} <span className="text-gray-900 font-black">BluMart</span>. Designed for Rahul Dhakad.
                    </p>
                    <div className="flex gap-8 text-gray-400 font-medium text-sm">
                        <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;