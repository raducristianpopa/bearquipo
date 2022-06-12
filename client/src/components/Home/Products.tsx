import React from "react";

import { IProducts } from "../../features/products/productsSlice";
import ButtonOrLink from "../ui/ButtonOrLink";

const Products: React.FC<{ products: IProducts[] | null }> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products?.map((product, index) => (
        <ButtonOrLink href={`product/${product.slug}`} key={index}>
          <div className="relative group">
            <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                crossOrigin="anonymous"
                src={`http://localhost:4000/static/images/${product.ProductImage[0].image}`}
                alt={product.name}
                className="object-cover object-center w-full h-full lg:w-full lg:h-full"
              />
            </div>
            <div className="flex flex-col justify-between mt-4">
              <h3 className="text-sm text-white">{product.name}</h3>
              <p className="my-1 text-sm text-gray-500">{product.supplier.name}</p>
              <p className="text-sm font-medium text-white">{product.price} &euro;</p>
            </div>
          </div>
        </ButtonOrLink>
      ))}
    </div>
  );
};

export default Products;
