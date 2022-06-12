import { useParams } from "react-router-dom";

import { selectCurrentProducts } from "../../features/products/productsSlice";
import { useTypedSelector } from "../../utils/hooks";

const Product = () => {
  const { slug } = useParams();
  const products = useTypedSelector(selectCurrentProducts);

  console.log(slug);
  const product = products!.filter(product => product.slug === slug)[0];

  return (
    <div className="relative flex items-center w-full px-4 pb-8 overflow-hidden pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
      <div className="grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
        <div className="overflow-hidden bg-gray-100 rounded-lg aspect-w-2 aspect-h-3 sm:col-span-4 lg:col-span-5">
          <img
            crossOrigin="anonymous"
            src={`http://localhost:4000/static/images/${product.ProductImage[0].image}`}
            alt={product.name}
            className="object-cover object-center"
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <h2 className="text-2xl font-extrabold sm:pr-12">{product.name}</h2>

          <section aria-labelledby="information-heading" className="mt-2">
            <h3 id="information-heading" className="sr-only">
              Product information
            </h3>

            <p className="text-2xl font-bold">{product.price} &euro;</p>
          </section>

          <section aria-labelledby="options-heading" className="mt-10">
            <h3 id="options-heading" className="sr-only">
              Product options
            </h3>

            <form>
              {/* Colors */}
              <div>
                <h4 className="text-2xl font-medium ">Description</h4>
                <p className="mt-2">{product.description}</p>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Size</h4>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Product;
