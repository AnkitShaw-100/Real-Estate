import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
    return (
        <div
            className="flex items-center justify-between py-4 bg-slate-100"
            style={{ paddingLeft: '15%', paddingRight: '15%' }}
        >
            {/* Logo */}
            <h1 className='text-black text-xl max-[600px]:text-lg sm:text-2xl font-bold whitespace-nowrap'>
                Urban<span className='text-blue-500'>Nest</span>
            </h1>

            {/* Nav Links */}
            <div className='flex space-x-8 font-medium text-sm sm:text-base'>
                {['Home', 'Product', 'Services', 'Contact', 'About Us'].map((text, index) => (
                    <p
                        key={text}
                        className={`relative cursor-pointer hover:font-bold hover:text-blue-500 ${[null, 'max-[980px]:hidden', 'max-[920px]:hidden', 'max-[860px]:hidden', 'max-[800px]:hidden'][index]
                            } after:content-[""] after:absolute after:left-1/4 after:bottom-0 after:h-[2px] after:w-1/2 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300`}
                    >
                        {text}
                    </p>
                ))}
            </div>

            {/* Buttons */}
            <div className='flex space-x-2 sm:space-x-4'>
                <button className='text-blue-500 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded bg-slate-200 font-medium hover:bg-slate-300'>
                    Sign In
                </button>
                <button className='text-white bg-blue-500 px-3 sm:px-5 py-1.5 sm:py-2.5 text-sm sm:text-base rounded font-semibold hover:bg-sky-700'>
                    Buy now
                </button>
                <button className='w-10 h-10 sm:w-12 sm:h-12 text-slate-700 bg-slate-200 rounded-full flex items-center justify-center text-lg sm:text-xl hover:bg-slate-300'>
                    <MdDarkMode />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
