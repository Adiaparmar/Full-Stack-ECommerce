import Navbar1 from "./components/Navbar/Navbar1";
import Navbar2 from "./components/Navbar/Navbar2";
import Hero from "./components/Hero";
import PhotoSlider from "./components/PhotoSlider";
import Marquee from "./components/Marquee";
import Gifting from "./components/Gifting";
import Footer from "./components/Footer";
import Upcat from "./components/HeroCategories";
import WebCat from "./components/WebCat";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

function App() {
  useEffect(() => {
    fetchDataFromApi("/api/products").then((data) => console.log(data));
  }, []);

  return (
    <>
      <div className="  w-full h-screen bg-[#EDF1F1]">
        <Navbar1 />
        <Navbar2 />
        <Upcat />
        <Hero />
        <WebCat />
        <PhotoSlider headerText="Current favourites!" />
        <PhotoSlider headerText="Category 1" />
        <PhotoSlider headerText="Category 2" />
        <PhotoSlider headerText="Category 3" />
        <PhotoSlider headerText="Category 4" />
        <PhotoSlider headerText="Category 5" />
        <PhotoSlider headerText="More categories!" />
        <Marquee />
        <Gifting />
        <Footer />
      </div>
    </>
  );
}

export default App;
