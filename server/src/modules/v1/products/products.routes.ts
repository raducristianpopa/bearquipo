import express from "express";

import ProductsController from "./products.controller";

const router = express.Router();

router.route("/").get(ProductsController.fetchProducts);
router.route("/categories").get(ProductsController.fetchCategories);

export default router;
