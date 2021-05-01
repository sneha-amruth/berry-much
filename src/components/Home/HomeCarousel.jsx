import "./HomeCarousel.css";
import { Link } from "react-router-dom";
import BannerImg from "../../assets/carousel-images/banner-img.png";

export default function HomeCarousel() {
  return (
    <>
      <div className="banner-img">
        <Link to="/products">
          <img
            src={BannerImg}
            alt="banner"
          />
        </Link>
      </div>
    </>
  );
}
