import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    // we are recieving json data from client, so need to parse

    const formData = JSON.parse(req.body.productData);
    const images = req.files;

    // map all images and put them in cloudinary and store them in an array
    const arrayOfImages = await Promise.all(
      images.map(async (image, index) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    // save all values in db
    await Product.create({ ...formData, image: arrayOfImages });

    return res.json({ success: true, message: "product added" });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const response = await Product.find({}).sort({ createdAt: -1 });

    return res.json({
      success: true,
      productData: response,
      message: "all data",
    });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

const updateStock = async (req, res) => {
  try {
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};
export { addProduct, getAllProducts };
