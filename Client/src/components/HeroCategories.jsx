import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import bags from "../images/bags.jpg";
import soaps from "../images/soaps.jpeg";
import kitchen from "../images/kitchen.jpeg";
import indoorplanters from "../images/indoorplants.png";
import decor from "../images/decor.png";
import fashion from "../images/fashion.jpeg";
import cosmetics from "../images/cosmetics.jpg";
import candle from "../images/candle.jpeg";
import cleaner from "../images/cleaner.jpeg";
import drink from "../images/drink.jpeg";

// Small Screen Menu (Menu1)
const Menu1 = [
  {
    id: 1,
    name: "Kitchen & Tableware",
    link: "/#",
    image: kitchen,
  },
  {
    id: 2,
    name: "Indoor Planters",
    link: "/#",
    image: indoorplanters,
  },
  {
    id: 3,
    name: "Home Decor",
    link: "/#",
    image: decor,
  },
  {
    id: 4,
    name: "Sustainable Fashion",
    link: "/#",
    image: fashion,
  },
  {
    id: 5,
    name: "Natural Beverages",
    link: "/#",
    image: drink,
  },
  {
    id: 6,
    name: "Cosmetics",
    link: "/#",
    image: cosmetics,
  },
  {
    id: 7,
    name: "Candles",
    link: "/#",
    image: candle,
  },
  {
    id: 8,
    name: "Biodegradable bags",
    link: "/#",
    image: bags,
  },
  {
    id: 9,
    name: "Cleaning agents",
    link: "/#",
    image: cleaner,
  },
  {
    id: 10,
    name: "Soaps",
    link: "/#",
    image: soaps,
  },
];

// Medium Screen Menu (Menu2)
const Menu2 = [
  {
    id: 1,
    name: "Soaps and Cosmetics",
    link: "/#",
    subcategories: [
      { id: 1, name: "Natural Soaps", link: "/#" },
      { id: 2, name: "Pure Personal Care", link: "/#" },
      { id: 3, name: "Organic Beauty Products", link: "/#" },
      { id: 4, name: "Natural Fragrances", link: "/#" },
    ],
  },
  {
    id: 2,
    name: "Kitchen & Tableware",
    link: "/#",
    subcategories: [
      { id: 1, name: "Classic Tableware", link: "/#" },
      { id: 2, name: "Kitchen Essentials", link: "/#" },
    ],
  },
  {
    id: 3,
    name: "Indoor Planters",
    link: "/#",
    subcategories: [{ id: 1, name: "Hydroponic Planters", link: "/#" }],
  },
  {
    id: 4,
    name: "Home Decor",
    link: "/#",
    subcategories: [
      { id: 1, name: "Unique Handicrafts", link: "/#" },
      { id: 2, name: "Bamboo and Wood Products", link: "/#" },
      { id: 3, name: "Natural Aroma Candles", link: "/#" },
    ],
  },
  {
    id: 5,
    name: "Sustainable Fashion",
    link: "/#",
    subcategories: [{ id: 1, name: "Eco-Friendly Bags", link: "/#" }],
  },
  {
    id: 6,
    name: "Organic Foods and Beverages",
    link: "/#",
    subcategories: [{ id: 1, name: "Natural Juices", link: "/#" }],
  },
  {
    id: 7,
    name: "Others",
    link: "/#",
    subcategories: [
      { id: 1, name: "Liquid Cleaners", link: "/#" },
      { id: 2, name: "Ayurvedic Remedies", link: "/#" },
      { id: 3, name: "Organic Manure", link: "/#" },
    ],
  },
];

// Small Screen Component (HeroCategories)
function HeroCategories() {
  return (
    <div className="justify-center items-center bg-[#EDF1F1] border-b no-scrollbar">
      <div className="no-scrollbar">
        <ul className="flex overflow-x-scroll gap-2 mt-2 px-1 no-scrollbar">
          {Menu1.map((item) => (
            <li
              className="p-2 flex group flex-col items-center w-[18vw] h-[15vh]"
              key={item.id}
            >
              <div className="rounded-full cursor-pointer overflow-hidden group-hover:drop-shadow-sm transition-transform duration-300 group hover:scale-105 group-hover:shadow-md group-hover:shadow-[#2D6A4F] border-[#2D6A4F] border-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-fill h-11 w-11"
                />
              </div>
              <a
                href={item.link}
                className="mt-2 text-xsm opacity-100 px-3 font-extralight hover:text-primary duration-200 text-[#255640] text-center"
                style={{ fontFamily: "Jacques Francois, serif" }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Medium Screen Component (UpperCategory)
const UpperCategory = () => {
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const handleMouseEnter = (id) => {
    setOpenCategoryId(id);
  };

  const handleMouseLeave = (id) => {
    if (openCategoryId === id) {
      setOpenCategoryId(null);
    }
  };

  return (
    <div className="w-full border-b border-zinc-400">
      <div className="flex justify-center items-center h-[9vh]">
        <ul className="flex items-center gap-9">
          {Menu2.map((category) => (
            <li
              key={category.id}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={() => handleMouseLeave(category.id)}
            >
              <a
                href={category.link}
                className="text-md px-3 py-2 hover:text-primary duration-200 flex items-center font-semibold"
                aria-haspopup="true"
                aria-expanded={openCategoryId === category.id}
                aria-controls={`subcategory-menu-${category.id}`}
              >
                {category.name}
                <IoIosArrowDropdown
                  className={`ml-1 transition-transform duration-200 ${
                    openCategoryId === category.id ? "rotate-180" : ""
                  }`}
                />
              </a>
              <ul
                id={`subcategory-menu-${category.id}`}
                className={`absolute z-[999] left-0 mt-2 bg-[#2D6A4F] text-white shadow-lg rounded-lg transition-all duration-300 ease-in-out ${
                  openCategoryId === category.id
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
                }`}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={() => handleMouseLeave(category.id)}
              >
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <a
                      href={subcategory.link}
                      className="block px-4 py-2 hover:bg-[#d9dfdf] hover:text-[#204b38] transition-colors duration-200"
                    >
                      {subcategory.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Combined App Component to Render Based on Screen Size
function Upcat() {
  return (
    <div>
      {/* Small Screen Layout */}
      <div className="block md:hidden">
        <HeroCategories />
      </div>

      {/* Medium Screen Layout */}
      <div className="hidden md:block">
        <UpperCategory />
      </div>
    </div>
  );
}

export default Upcat;
