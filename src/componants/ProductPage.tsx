import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    try {
      const productResponse = await fetch(
        `https://dummyjson.com/products?limit=6&skip=${6 * (page - 1)}`,
        {
          method: "GET",
        }
      );
      const jsonProducts = await productResponse.json();
      dispatch(setProducts({ products: jsonProducts.products }));
    } catch (error: any) {
      console.log(error.message || "Failed to fetch");
      toast.error(error.message || "Failed to fetch");
    }
  };
  const handlePrev = () => {
    setPage((prev) => (prev = prev - 1));
  };
  const handleNext = () => {
    setPage((prev) => (prev = prev + 1));
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <div className="w-full   bg-[#101820]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center px-6">
        {products.length > 0 &&
          products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.images[0]}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
      </div>
      <div className="flex w-full gap-4 justify-center my-6">
        <button
          className="px-8 py-2 text-white bg-gray-500 transition duration-300 hover:bg-gray-900 hover:text-gray-200"
          onClick={() => handlePrev()}
        >
          Prev
        </button>
        <button
          className="px-8 py-2 text-white bg-gray-500 transition duration-300 hover:bg-gray-900 hover:text-gray-200"
          onClick={() => handleNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
