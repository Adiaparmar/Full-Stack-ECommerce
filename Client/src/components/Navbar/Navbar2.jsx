// import { useState } from "react";
// import {
//   AiOutlineUser,
//   AiOutlineShoppingCart,
//   AiOutlineHeart,
//   AiOutlineSearch,
//   AiOutlineMenu,
//   AiOutlineClose,
// } from "react-icons/ai";
// import { IoSearch } from "react-icons/io5";
// import logo from "../../images/logo.png";

// function Navbar2() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Toggle the mobile menu
//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//     console.log("Menu Open:", !menuOpen); // For debugging
//   };

//   return (
//     <nav className="bg-[#EDF1F1] border-zinc-400 md:{shadow-md} relative">
//       <div className="container mx-auto flex justify-between items-center px-4 py-0 md:{px-0}">
//         {/* Logo */}
//         <div className="flex">
//           <button
//             className="md:hidden p-2 "
//             onClick={toggleMenu}
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? (
//               <AiOutlineClose className="w-6 h-6 text-gray-800" />
//             ) : (
//               <AiOutlineMenu className="w-6 h-6 text-gray-800" />
//             )}
//           </button>
//           <a
//             href="#"
//             className="flex items-center h-[10vh] w-[30vw] md:h-[10vh] md:w-[16vw]"
//           >
//             <img
//               src={logo}
//               alt="GreenPlore Logo"
//               className=" mt-4 md:mt-6 w-[full] h-[10vh] md:h-[10vh] md:w-[16vw]"
//             />
//           </a>
//         </div>
//         <div>
//           <button className="p-3">
//             <AiOutlineUser className="w-6 h-6 md:w-6 md:h-6 hover:scale-110 hover:text-[#2D6A4F] transition-transform text-gray-800" />
//           </button>
//           <button className="p-3">
//             <AiOutlineShoppingCart className="w-6 h-6 md:w-6 md:h-6 hover:scale-110 hover:text-[#2D6A4F] transition-transform text-gray-800" />
//           </button>
//         </div>

//         {/* Search Bar for Desktop */}
//         <div className="hidden md:flex items-center flex-grow max-w-xl mx-4">
//           <input
//             type="text"
//             placeholder="Search for..."
//             className="w-full p-2 border border-gray-400 rounded-md outline-none focus:ring focus:ring-green-300"
//           />
//           <button className="ml-2 p-2 group hover:bg-[#52B788] transition-transform rounded-full flex items-center justify-center h-10 w-10">
//             <AiOutlineSearch className="w-5 h-5 group-hover:text-white" />
//           </button>
//         </div>

//         {/* Icons and Button for Desktop */}
//         <div className="hidden md:flex items-center space-x-2 md:space-x-4">
//           <button className="p-2">
//             <AiOutlineUser className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 hover:text-[#2D6A4F] transition-transform text-gray-800" />
//           </button>
//           <button className="p-2">
//             <AiOutlineShoppingCart className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 hover:text-[#2D6A4F] transition-transform text-gray-800" />
//           </button>
//           <button className="p-2">
//             <AiOutlineHeart className="w-5 h-5 md:w-6 md:h-6 hover:text-red-700 hover:scale-110 transition-transform text-gray-800" />
//           </button>
//           <button className="hidden md:block bg-[#52B788] hover:scale-110 transition-transform text-white px-4 py-2 rounded-full">
//             Become a Seller
//           </button>
//         </div>

//         {/* Hamburger Icon for Mobile */}
//       </div>

//       {/* Mobile Menu Overlay */}
//       <div
//         className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#EDF1F1] z-50 transform ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out`}
//       >
//         <div className="flex flex-col items-start p-4 space-y-4 mt-16">
//           {" "}
//           {/* Adjust mt based on navbar height */}
//           <input
//             type="text"
//             placeholder="Search for..."
//             className="w-full p-2 border border-gray-400 rounded-md outline-none focus:ring focus:ring-green-300"
//           />
//           <button
//             className="flex items-center space-x-2 w-full text-left"
//             onClick={() => setMenuOpen(false)}
//           >
//             <AiOutlineUser className="w-6 h-6 text-gray-800" />
//             <span>Profile</span>
//           </button>
//           <button
//             className="flex items-center space-x-2 w-full text-left"
//             onClick={() => setMenuOpen(false)}
//           >
//             <AiOutlineShoppingCart className="w-6 h-6 text-gray-800" />
//             <span>Cart</span>
//           </button>
//           <button
//             className="flex items-center space-x-2 w-full text-left"
//             onClick={() => setMenuOpen(false)}
//           >
//             <AiOutlineHeart className="w-6 h-6 text-gray-800" />
//             <span>Wishlist</span>
//           </button>
//           <button
//             className="bg-[#52B788] text-white px-4 py-2 rounded-full w-full text-center"
//             onClick={() => setMenuOpen(false)}
//           >
//             Become a Seller
//           </button>
//         </div>
//       </div>
//       <div className="h-18 md:hidden m-3 mt-0 p-2 pl-7 bg-[#9db3aa] gap-3 flex items-center rounded-lg text-grey">
//         <IoSearch />
//         Search for ...
//       </div>
//     </nav>
//   );
// }

// export default Navbar2;

import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import logo from "../../images/logo.png";

function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    console.log("Menu Open:", !menuOpen); // For debugging
  };

  return (
    <nav className="bg-[#EDF1F1] border-zinc-400 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center py-0 px-1 md:px-4 md:py-2">
        {/* Logo */}
        <div className="flex items-center">
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <AiOutlineClose className="w-6 h-6 text-gray-800" />
            ) : (
              <AiOutlineMenu className="w-6 h-6 text-gray-800" />
            )}
          </button>
          <a
            href="#"
            className="flex items-center h-[10vh] w-[30vw] md:h-[10vh] md:w-[16vw]"
          >
            <img
              src={logo}
              alt="GreenPlore Logo"
              className="mt-2 md:mt-6 w-full h-full object-contain"
            />
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-grow max-w-xl mx-4">
          <input
            type="text"
            placeholder="Search for..."
            className="w-full p-2 border border-gray-400 rounded-md outline-none focus:ring focus:ring-green-300"
          />
          <button className="ml-2 p-2 group hover:bg-[#52B788] transition-transform rounded-full flex items-center justify-center h-10 w-10">
            <AiOutlineSearch className="w-5 h-5 group-hover:text-white" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2">
            <AiOutlineUser className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 hover:text-[#2D6A4F] transition-transform text-gray-800" />
          </button>
          <button className="p-2">
            <AiOutlineShoppingCart className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 hover:text-[#2D6A4F] transition-transform text-gray-800" />
          </button>
          <button className="p-2">
            <AiOutlineHeart className="w-5 h-5 md:w-6 md:h-6 hover:text-red-700 hover:scale-110 transition-transform text-gray-800" />
          </button>
          <button className="hidden md:block bg-[#52B788] hover:scale-110 transition-transform text-white px-4 py-2 rounded-full">
            Become a Seller
          </button>
        </div>

        {/* Search Bar for Mobile */}
        <div className="hidden md:hidden m-3 mt-0 p-2 pl-7 bg-[#9db3aa] gap-3 flex items-center rounded-lg text-grey">
          <IoSearch />
          Search for ...
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#EDF1F1] z-50 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-start p-4 space-y-4 mt-16">
          <input
            type="text"
            placeholder="Search for..."
            className="w-full p-2 border border-gray-400 rounded-md outline-none focus:ring focus:ring-green-300"
          />
          <button
            className="flex items-center space-x-2 w-full text-left"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineUser className="w-6 h-6 text-gray-800" />
            <span>Profile</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full text-left"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineShoppingCart className="w-6 h-6 text-gray-800" />
            <span>Cart</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full text-left"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineHeart className="w-6 h-6 text-gray-800" />
            <span>Wishlist</span>
          </button>
          <button
            className="bg-[#52B788] text-white px-4 py-2 rounded-full w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Become a Seller
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;
