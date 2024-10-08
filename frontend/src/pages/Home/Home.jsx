import Announcement from "../../components/Announcement";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/NewsLetter";
import Products from "../../components/Products";
import Slider from "../../components/Slider";




const Home = () => {
    return (
        <div>
            <Announcement></Announcement>
            <Navbar></Navbar>
            <Slider></Slider>
            <Categories></Categories>
            <Products></Products>
            <Newsletter></Newsletter>
            <Footer></Footer>


        </div>
    );
};

export default Home;