import { Prisma, Product, ProductCategory, Supplier } from "@prisma/client";

type ProductInfoProps = Pick<Product, "name" | "description" | "slug" | "price"> & {
  supplier: Pick<Supplier, "name">;
  category: Pick<ProductCategory, "name">[];
};

export const ProductData = Prisma.validator<Prisma.ProductSelect>()({
  name: true,
  description: true,
  slug: true,
  price: true,
  supplier: {
    select: {
      name: true,
    },
  },
  category: {
    select: {
      name: true,
    },
  },
  ProductImage: {
    select: {
      image: true,
    },
  },
});

export interface IProductInterface {
  getProducts(): Promise<ProductInfoProps[]>;
  getCategories(): Promise<ProductCategory[]>;
}
