import AboutUs from "./AboutUs";
import AllClassesHome from "./AllClassesHome";
import Banner from "./Banner";
import Features from "./Features";
import NewsLetter from "./Newsletter";
import OurTrainers from "./OurTrainers";
import RecentPosts from "./RecentPosts";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
      <div className="">
        <Banner></Banner>
        <Features></Features>
        <AboutUs></AboutUs>
        <Testimonials></Testimonials>
        <AllClassesHome></AllClassesHome>
        <RecentPosts></RecentPosts>
        <OurTrainers></OurTrainers>
        <NewsLetter></NewsLetter>
      </div>
    );
};

export default Home;