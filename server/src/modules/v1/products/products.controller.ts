import { Request, Response } from "express";
import HTTPStatus from "http-status";

import { catcher } from "@utils/catch";

import ProductService from "./products.service";

const ProductController = {
  fetchProducts: catcher(async function (_req: Request, res: Response): Promise<void> {
    const products = await ProductService.getProducts();
    res.status(HTTPStatus.OK).json({ products });
  }),

  fetchCategories: catcher(async function (_req: Request, res: Response): Promise<void> {
    const categories = await ProductService.getCategories();
    res.status(HTTPStatus.OK).json({ categories });
  }),
};

export default ProductController;
