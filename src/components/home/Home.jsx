import Trending from "./trending/Trending";
import Bestselling from "./bestSelling/Bestselling";
import Blog from "./blogComponent/Blog";
import Social from "./socialComponent/Social";
import Support from "./supportComponent/Support";
import Hero from "./heroComponent/Hero";
import BannerComponent from "./bannerComponent/Banner";

const Home = () => {
  return (
    <>
      <BannerComponent />
      <Hero></Hero>
      <Trending></Trending>
      <Bestselling></Bestselling>
      <Blog></Blog>
      <Social></Social>
      <Support></Support>
    </>
  );
};

export default Home;
