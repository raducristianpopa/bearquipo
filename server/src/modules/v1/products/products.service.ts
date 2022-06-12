// import HTTPStatus from "http-status";

// import APIError from "@config/APIError";
import db from "@utils/db";

import { IProductInterface, ProductData } from "./products.interface";

const ProductService: IProductInterface = {
  async getProducts() {
    const products = await db.product.findMany({
      where: {
        quantity: {
          gt: 0,
        },
      },
      select: ProductData,
    });

    return products;
  },

  async getCategories() {
    const categories = await db.productCategory.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    return categories;
  },
};

export default ProductService;
