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
const Menu = [
  {
    id: 1,
    name: "Soaps",
    link: "/#",
    image: soaps,
  },
  {
    id: 2,
    name: "Kitchen & Tableware",
    link: "/#",
    image: kitchen,
  },
  {
    id: 3,
    name: "Indoor Planters",
    link: "/#",
    image: indoorplanters,
  },
  {
    id: 4,
    name: "Home Decor",
    link: "/#",
    image: decor,
  },
  {
    id: 5,
    name: "Sustainable Fashion",
    link: "/#",
    image: fashion,
  },
  {
    id: 6,
    name: "Natural Beverages",
    link: "/#",
    image: drink,
  },
  {
    id: 7,
    name: "Cosmetics",
    link: "/#",
    image: cosmetics,
  },
  {
    id: 8,
    name: "Candles",
    link: "/#",
    image: candle,
  },
  {
    id: 9,
    name: "Biodegradable bags",
    link: "/#",
    image: bags,
  },
  {
    id: 10,
    name: "Cleaning agents",
    link: "/#",
    image: cleaner,
  },
];

function WebCat() {
  return (
    <div className="hidden md:block flex justify-center items-center h-screen  mt-3vh px-7 bg-[white] border-b">
      <div className="mt-20 px-4">
        <ul className="flex flex-wrap justify-between">
          {Menu.map((item) => (
            <li className=" p-4 group flex flex-col items-center" key={item.id}>
              <div className="rounded-full cursor-pointer overflow-hidden group-hover:drop-shadow-sm w-[15vw] h-[31vh] object-fill transition-transform duration-300 group hover:scale-105  group-hover:shadow-md  group-hover:shadow-[#2D6A4F] border-[#2D6A4F] border-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <a
                href={item.link}
                className="mt-2 text-2xl px-3 hover:text-primary duration-200 text-[#255640] text-center"
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

export default WebCat;
