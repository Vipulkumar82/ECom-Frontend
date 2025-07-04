import ProductCard from "../componants/ProductCard";

const ProductDetails = () => {
  return (
    <div className="w-full bg-blue-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6">
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
  );
};

export default ProductDetails;
