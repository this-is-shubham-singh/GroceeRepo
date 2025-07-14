import "../App.css";
import { categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      <div className="categories-row">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-box"
            style={{ backgroundColor: cat.bgColor }}
            onClick={() => navigate(`/products/${cat.path}`)}
          >
            <img src={cat.image} alt={cat.path} className="category-img" />
            <p className="category-label">{cat.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
