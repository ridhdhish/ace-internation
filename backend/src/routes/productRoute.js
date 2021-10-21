const { Router } = require("express");
const productController = require("../controllers/productController");
const localUpload = require("../utils/multer");

const router = Router();

router.post("/create-product", localUpload, productController.createProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.get("/products", productController.getProducts);
router.put("/update-product/:id", productController.updateProduct);

module.exports = router;
