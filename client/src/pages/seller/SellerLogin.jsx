import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { toast } from "react-toastify";

const SellerLogin = () => {
  const [state, setState] = useState("login");
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("123");
  const { axios, setSeller } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/seller/sellerLogin", {
        email,
        password,
      });

      if (data.success == false) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      setSeller(true);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="password"
            required
          />
        </div>

        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
