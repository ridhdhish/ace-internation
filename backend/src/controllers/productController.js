const Product = require("../models/Product");
const S3 = require("../utils/aws.js");

/* 
    Route: POST /create-product
    Description: Create new product
*/
module.exports.createProduct = async (req, res) => {
  try {
    console.log(req.file);
    const { originalname, mimetype, buffer, size } = req.file;
    const fileData = originalname.split(".");
    const fileType = fileData[fileData.length - 1];
    const fileName = fileData.slice(0, fileData.length - 1).join();
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Math.random().toString().slice(4, 32)}.${fileType}`,
      Body: buffer,
      ContentType: mimetype,
    };
    S3.upload(params, async (err, data) => {
      if (err)
        return res.status(400).json({
          message: err.message,
        });
      const { Location, key } = data;

      const product = await Product.create({
        ...req.body,
        productImage: Location,
      });
      console.log(product);
      if (!product) {
        return res.status(401).json({ message: "Cannot create new product" });
      }

      res.status(200).json("{ product }");
    });
  } catch (err) {
    console.log(err);
  }
};

/* 
    Route: DELETE /delete-product
    Description: Delete a product
*/
module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    console.log({ product });
    if (!product) {
      return res.status(401).json({ message: "Cannot delete product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.log(err);
  }
};

/* 
    Route: GET /products
    Description: Fetch all the products
*/
module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(401).json({ message: "No products are available" });
    }

    res.status(200).json({ products });
  } catch (err) {
    console.log(err);
  }
};

/* 
    Route: PUT /update-product
    Description: Update a Product
*/
module.exports.updateProduct = async (req, res) => {
  const { name, vat, grossPrice, netPrice, stock, stockImage } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(401)
        .json({ message: "No product is available to update/edit" });
    }

    if (name) product.name = name;
    if (vat) product.vat = vat;
    if (grossPrice) product.grossPrice = grossPrice;
    if (netPrice) product.netPrice = netPrice;
    if (stock) product.stock = stock;
    if (stockImage) product.stockImage = stockImage;

    product.save();

    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};
