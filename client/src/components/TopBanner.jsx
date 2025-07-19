import { useNavigate } from "react-router-dom";
import "../App.css";

export default function TopBanner() {
  const navigate = useNavigate();
  return (
    <div className="top-banner">
      <div className="banner-content">
        <div className="banner-left">
          <h1 className="banner-heading">
            Freshness You Can Trust, <br /> Savings You will Love!
          </h1>
          <button className="shop-button" onClick={() => navigate("/products")}>
            Shop now
          </button>
        </div>
        <div className="banner-right">{/* Optional right content */}</div>
      </div>
    </div>
  );
}
