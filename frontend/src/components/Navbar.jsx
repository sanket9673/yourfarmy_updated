// import React, { useContext, useState } from 'react';
// import { Menu, X } from "lucide-react";
// import logo from '../assets/logo.png';
// import { navItems } from '../constants/index.jsx';
// import { Link } from 'react-router-dom';
// import AuthContext from '../contexts/AuthContext';

// const Navbar = () => {
//     const { state, logout } = useContext(AuthContext);
//     const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//     const [activeNavItem, setActiveNavItem] = useState(""); // Track active nav item

//     const toggleNavbar = () => {
//         setMobileDrawerOpen(!mobileDrawerOpen);
//     };

//     const handleNavItemClick = (item) => {
//         setActiveNavItem(item); // Set active item when clicked
//         toggleNavbar(); // Close the mobile drawer if in mobile view
//     };

//     return (
//         <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
//             <div className="container px-4 mx-auto relative text-sm">
//                 <div className="flex justify-between items-center">
//                     <div className="flex items-center flex-shrink-0">
//                         <img className="h-10 w-10 m-2" src={logo} alt="logo" />
//                         <span className="text-xl tracking-tight">YourFarmy</span>
//                     </div>

//                     {/* Desktop Nav Items */}
//                     <ul className="hidden lg:flex ml-5 space-x-12">
//                         {state.isLoggedIn && navItems.map((item, index) => (
//                             <li key={index} className="relative">
//                                 <Link
//                                     to={item.href}
//                                     onClick={() => handleNavItemClick(item.label)}
//                                     className={activeNavItem === item.label ? 'text-orange-500 font-semibold' : ''}
//                                 >
//                                     {item.label}
//                                 </Link>
//                                 {/* Dot Indicator */}
//                                 {activeNavItem === item.label && (
//                                     <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>

//                     {/* Desktop SignIn/SignOut Button */}
//                     <div className="hidden lg:flex justify-center space-x-12 items-center">
//                         {state.isLoggedIn ? (
//                             <button onClick={logout} className="py-2 px-3 border rounded-md">Sign Out</button>
//                         ) : (
//                             <Link to="/signin" className="py-2 px-3 border rounded-md">Sign In</Link>
//                         )}
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="lg:hidden md:flex flex-cols justify-end">
//                         <button onClick={toggleNavbar}>
//                             {mobileDrawerOpen ? <X /> : <Menu />}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Drawer */}
//                 {mobileDrawerOpen && (
//                     <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
//                         <ul className="space-y-6">
//                             {state.isLoggedIn ? (
//                                 <>
//                                     {navItems.map((item, index) => (
//                                         <li key={index} className="relative">
//                                             <Link
//                                                 to={item.href}
//                                                 onClick={() => handleNavItemClick(item.label)}
//                                                 className={activeNavItem === item.label ? 'text-blue-500 font-semibold' : ''}
//                                             >
//                                                 {item.label}
//                                             </Link>
//                                             {/* Dot Indicator for Mobile */}
//                                             {activeNavItem === item.label && (
//                                                 <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></span>
//                                             )}
//                                         </li>
//                                     ))}
//                                     <li>
//                                         <button onClick={() => { logout(); toggleNavbar(); }} className="py-2 px-3 border rounded-md">Sign Out</button>
//                                     </li>
//                                 </>
//                             ) : (
//                                 <li>
//                                     <Link to="/signin" onClick={toggleNavbar}>Sign In</Link>
//                                 </li>
//                             )}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// }

// export default Navbar;



import React, { useContext, useState } from 'react';
import { Menu, X } from "lucide-react";
import logo from '../assets/logo.png';
import { navItems } from '../constants/index.jsx';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
    const { state, logout } = useContext(AuthContext);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState(""); // Track active nav item

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    const handleNavItemClick = (item) => {
        setActiveNavItem(item); // Set active item when clicked
        toggleNavbar(); // Close the mobile drawer if in mobile view
    };

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-10 m-2" src={logo} alt="logo" />
                        <span className="text-xl tracking-tight">YourFarmy</span>
                    </div>

                    {/* Desktop Nav Items */}
                    <ul className="hidden lg:flex ml-5 space-x-12">
                        {state.isLoggedIn && navItems.map((item, index) => (
                            <li key={index} className="relative">
                                <Link
                                    to={item.href}
                                    onClick={() => handleNavItemClick(item.label)}
                                    className={activeNavItem === item.label ? 'text-orange-500 font-semibold' : ''}
                                >
                                    {item.label}
                                </Link>
                                {/* Dot Indicator */}
                                {activeNavItem === item.label && (
                                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Desktop SignIn/SignOut Button */}
                    <div className="hidden lg:flex justify-center space-x-6 items-center">
                        {state.isLoggedIn ? (
                            <button onClick={logout} className="py-2 px-3 border rounded-md">Sign Out</button>
                        ) : (
                            <>
                                <Link to="/signin" className="py-2 px-3 border rounded-md">Sign In</Link>
                                <Link to="/register" className="py-2 px-3 border rounded-md">Register</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden md:flex flex-cols justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul className="space-y-6">
                            {state.isLoggedIn ? (
                                <>
                                    {navItems.map((item, index) => (
                                        <li key={index} className="relative">
                                            <Link
                                                to={item.href}
                                                onClick={() => handleNavItemClick(item.label)}
                                                className={activeNavItem === item.label ? 'text-blue-500 font-semibold' : ''}
                                            >
                                                {item.label}
                                            </Link>
                                            {/* Dot Indicator for Mobile */}
                                            {activeNavItem === item.label && (
                                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></span>
                                            )}
                                        </li>
                                    ))}
                                    <li>
                                        <button onClick={() => { logout(); toggleNavbar(); }} className="py-2 px-3 border rounded-md">Sign Out</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/signin" onClick={toggleNavbar} className="py-2 px-3 border rounded-md">Sign In</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" onClick={toggleNavbar} className="py-2 px-3 border rounded-md">Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
