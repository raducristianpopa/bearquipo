import { useEffect } from "react";
import { selectCurrentCategoriesStore, setCategory } from "../../features/products/categorySlice";
import { selectCurentProductsStore, setProducts } from "../../features/products/productsSlice";
import { useAppDispatch, useTypedSelector } from "../../utils/hooks";
import Loader from "../Loader";
import Categories from "./Categories";
import Products from "./Products";

function Home() {
  const dispatch = useAppDispatch();
  const { products, loading: productsLoading } = useTypedSelector(selectCurentProductsStore);
  const { category, loading: categoryLoading } = useTypedSelector(selectCurrentCategoriesStore);

  useEffect(() => {
    dispatch(setProducts());
    dispatch(setCategory());
  }, [dispatch]);

  if (productsLoading || categoryLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-3 mb-20 lg:grid-cols-12">
      <div className="order-1 col-span-8 lg:col-span-2 lg:order-none">
        <Categories categories={category} />
      </div>
      <div className="order-3 col-span-8 lg:order-none">
        <Products products={products} />
      </div>
      <div className="order-2 col-span-8 lg:col-span-2 lg:order-none">sss</div>
    </div>
  );
}

export default Home;
