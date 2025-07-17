import Address from "../models/addressModel.js";

const addAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { addressData } = req.body;

    if (!id) {
      return res.json({ success: false, message: "unauthorized user" });
    }

    if (!addressData) {
      return res.json({ success: false, message: "send valid address" });
    }

    const addressObj = new Address({ userId: id, ...addressData });
    await addressObj.save();

    return res.json({
      success: true,
      message: "address saved",
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

const getAllAddress = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await Address.find({ userId: id }).select("-userId");
    if (!response) {
      return res.json({ success: false, message: "no address found" });
    }

    return res.json({
      success: true,
      message: "all address",
      allAddresses: response,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

export { addAddress, getAllAddress };
