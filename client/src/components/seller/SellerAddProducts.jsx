import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { toast } from "react-toastify";
import "../../App.css";

const SellerAddProducts = () => {
  const [completeData, setCompleteData] = useState({
    name: "",
    description: "",
    price: 0,
    offerPrice: 0,
    category: "",
  });

  const [imageData, setImageData] = useState([null, null, null, null]);

  const { axios } = useContext(AppContext);

  // ************** function to call api *******************
  async function handleSubmit(e) {
    e.preventDefault();

    // FormData is only used when you have to send files also with the data
    // when you only want to send text data then you normally send it
    // the axios automatically converts that to json before sending

    const formData = new FormData();
    formData.append("productData", JSON.stringify(completeData));

    for (let i = 0; i < 4; i++) {
      if (imageData[i] != null) {
        formData.append("images", imageData[i]);
      }
    }

    try {
      const { data } = await axios.post("product/addProduct", formData);

      console.log(data);

      if (data.success == false) {
        toast.error(data.message);
        return;
      }

      setCompleteData({
        name: "",
        description: "",
        price: 0,
        offerPrice: 0,
        category: "",
      });

      for(let i = 0; i < 4; i++) {
        imageData[i] = null;
      }

      toast.success(data.message);
    } catch (e) {
      console.log(e);
    }
  }

  // ****************** function to update data on state *******************
  function updateCompleteData(e) {
    setCompleteData((existingData) => {
      return { ...existingData, [e.target.name]: e.target.value };
    });
  }

  // console.log(imageData);

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  className={`${imageData[index] != null ? "borderBlue" : ""}`}
                  key={index}
                  htmlFor={`image${index}`}
                >
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setImageData((currentData) => {
                          const arr = [...currentData];

                          arr[index] = e.target.files[0];

                          return arr;
                        });
                      }
                    }}
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            name="name"
            value={completeData.name}
            onChange={(e) => updateCompleteData(e)}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            name="description"
            value={completeData.description}
            onChange={(e) => updateCompleteData(e)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            name="category"
            value={completeData.category}
            onChange={(e) => updateCompleteData(e)}
          >
            <option value="">Select Category</option>
            {[
              { name: "Vegetables" },
              { name: "Fruits" },
              { name: "Drinks" },
              { name: "Instant" },
              { name: "Dairy" },
              { name: "Backery" },
              { name: "Grains" },
            ].map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              name="price"
              value={completeData.price}
              onChange={(e) => updateCompleteData(e)}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              name="offerPrice"
              value={completeData.offerPrice}
              onChange={(e) => updateCompleteData(e)}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>
        <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">
          ADD
        </button>
      </form>
    </div>
  );
};

export default SellerAddProducts;
