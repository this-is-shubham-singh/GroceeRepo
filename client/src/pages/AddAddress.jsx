import { useContext, useState } from "react";
import "../App.css";
import { assets } from "../assets/assets/";
import { AppContext } from "../context/AppContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddAddress() {
  const { axios } = useContext(AppContext);
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const updateAddressData = (e) => {
    let value = e.target.value;
    let nameValue = e.target.name;

    setAddressData((existing) => {
      return { ...existing, [nameValue]: value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/address/addAddress", { addressData });

      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success("address added successfully");
      navigate("/cart");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="add-address-wrapper">
      <h2 className="add-address-heading">Add Shipping Address</h2>

      <div className="add-address-content">
        {/* Left - FORM */}
        <form onSubmit={(e) => handleSubmit(e)} className="address-form">
          <input
            type="text"
            value={addressData.firstName}
            onChange={(e) => updateAddressData(e)}
            name="firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            value={addressData.lastName}
            onChange={(e) => updateAddressData(e)}
            name="lastName"
            placeholder="Last Name"
          />
          <input
            type="email"
            value={addressData.email}
            onChange={(e) => updateAddressData(e)}
            name="email"
            placeholder="Email Address"
          />
          <input
            type="text"
            value={addressData.street}
            onChange={(e) => updateAddressData(e)}
            name="street"
            placeholder="Street"
          />
          <input
            type="text"
            value={addressData.city}
            onChange={(e) => updateAddressData(e)}
            name="city"
            placeholder="City"
          />
          <input
            type="text"
            value={addressData.state}
            onChange={(e) => updateAddressData(e)}
            name="state"
            placeholder="State"
          />
          <input
            type="text"
            value={addressData.zipcode}
            onChange={(e) => updateAddressData(e)}
            name="zipcode"
            placeholder="Zipcode"
          />
          <input
            type="text"
            value={addressData.country}
            onChange={(e) => updateAddressData(e)}
            name="country"
            placeholder="Country"
          />
          <input
            type="tel"
            value={addressData.phone}
            onChange={(e) => updateAddressData(e)}
            name="phone"
            placeholder="Phone"
          />

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
