import { useContext, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowLoginForm,
    countCartItems,
    setSearchValue,
    searchValue,
    axios,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    navigate("/products");
    setSearchValue(e.target.value);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");

      if (data.success == false) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      setUser(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to={"/"}>
        <img src={assets.companyLogo} style={{width: "70px"}}/>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          to={"/seller/addProducts"}
          className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer`}
        >
          Seller
        </NavLink>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/products"} onClick={() => setSearchValue("")}>
          All Products
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={searchValue}
            onChange={(e) => handleInputChange(e)}
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#615fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            {countCartItems()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowLoginForm(true)}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            {/* Circular letter avatar */}
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold cursor-pointer">
              S
            </div>

            {/* Dropdown: appears on hover */}
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition duration-200 z-10 pointer-events-auto">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => navigate("/myOrders")}
              >
                My Orders
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}

      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink onClick={() => setOpen(close)} className="block">
          Home
        </NavLink>
        <NavLink onClick={() => setOpen(close)} className="block">
          About
        </NavLink>
        <NavLink onClick={() => setOpen(close)} className="block">
          Contact
        </NavLink>
        {!user ? (
          <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
            Login
          </button>
        ) : (
          <>
            <a onClick={() => setOpen(close)} href="#" className="block">
              My Orders
            </a>
            <a onClick={() => setOpen(close)} href="#" className="block">
              Logout
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
