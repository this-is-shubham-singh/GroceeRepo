import "../App.css";
import { features } from "../assets/assets";

export default function BottomBanner() {
  return (
    <div className="bottom-banner">
      <div className="bottom-left">
        {/* <img
          src="/images/banner-left-image.jpg" // Replace with your actual image
          alt="Grocery Visual"
          className="bottom-image"
        /> */}
      </div>

      <div className="bottom-right">
        <h2 className="bottom-heading">Why We are the Best?</h2>
        <div className="features-list">
          {features.map((item, index) => (
            <div key={index} className="feature-item">
              <img src={item.icon} alt={item.title} className="feature-icon" />
              <div className="feature-text">
                <h4 className="feature-title">{item.title}</h4>
                <p className="feature-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
