import "../App.css";
import { assets } from "../assets/assets/";

export default function AddAddress() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="add-address-wrapper">
      <h2 className="add-address-heading">Add Shipping Address</h2>

      <div className="add-address-content">
        {/* Left - FORM */}
        <form onSubmit={(e) => handleSubmit(e)} className="address-form">
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="email" name="email" placeholder="Email Address" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="state" placeholder="State" />
          <input type="text" name="zipcode" placeholder="Zipcode" />
          <input type="text" name="country" placeholder="Country" />
          <input type="tel" name="phone" placeholder="Phone" />

          <button type="submit" className="save-btn">
            Save Address
          </button>
        </form>

        {/* Right - Image */}
        <div className="form-image">
          <img src={assets.add_address_image} alt="Shipping" />
        </div>
      </div>
    </div>
  );
}
