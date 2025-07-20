import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts, updateFilteredProducts } from "../redux/productSlice";

const ITEMS_PER_PAGE = 6;

const ProductPage = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state: any) => state.products.filteredProducts);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = allProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productResponse = await fetch(
        `https://dummyjson.com/products?limit=100`,
        {
          method: "GET",
        }
      );
      const jsonProducts = await productResponse.json();
      dispatch(setAllProducts(jsonProducts.products));
    } catch (error: any) {
      console.log(error.message || "Failed to fetch");
      toast.error(error.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#101820]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center px-6">
        {currentProducts.length > 0 &&
          currentProducts.map((product: any) => (
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
          disabled={currentPage === 1}
          className={`px-8 py-2 text-white ${
            currentPage === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-900 hover:text-gray-200'
          } transition duration-300`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        <div className="flex items-center px-4 text-white">
          Page {currentPage} of {totalPages}
        </div>
        <button
          disabled={currentPage === totalPages}
          className={`px-8 py-2 text-white ${
            currentPage === totalPages
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-900 hover:text-gray-200'
          } transition duration-300`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
