import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast, { Toaster } from 'react-hot-toast';

type ProductCardProps = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
};

const ProductCard = ({
  id,
  imageUrl,
  title,
  description,
  price,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-74 my-4">
      <Toaster position="top-right" />
      <div className="bg-[#8AAAE5] w-full rounded-2xl flex flex-col pb-2">
        <div className="relative h-64 w-full overflow-hidden p-2">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/60">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {!error ? (
            <img
              src={imageUrl}
              alt={title}
              className={`h-full w-full object-cover rounded-2xl transition-opacity duration-300 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setLoading(false)}
              onError={() => {
                setError(true);
                setLoading(false);
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-red-600">
              Failed to load image
            </div>
          )}
        </div>

        <div className="ml-4">
          <h3 className="text-xl font-semibold tracking-wide">{title}</h3>
          <p>{description.substring(0, 50)}...</p>
          <h2 className="font-bold tracking-wide">
            Rs {price.toLocaleString()}
          </h2>
        </div>

        <div className="mt-2 flex justify-around">
          <button 
            onClick={() => {
              try {
                dispatch(addToCart({ 
                  id, 
                  title, 
                  description, 
                  price,
                  category: "Default",
                  discountPercentage: 0,
                  rating: 0,
                  stock: 100,
                  tags: [],
                  brand: "",
                  sku: "",
                  weight: 0,
                  dimensions: { width: 0, height: 0, depth: 0 },
                  warrantyInformation: "",
                  shippingInformation: "",
                  availabilityStatus: "In Stock",
                  reviews: [],
                  returnPolicy: "",
                  minimumOrderQuantity: 1,
                  meta: {
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    barcode: "",
                    qrCode: ""
                  },
                  thumbnail: imageUrl,
                  images: [imageUrl] 
                }));
                toast.success('Added to cart! 🛍️');
              } catch (error) {
                toast.error('Failed to add to cart ❌');
                console.error('Error adding to cart:', error);
              }
            }}
            className="bg-[#4681f4] cursor-pointer py-1 px-10 rounded-2xl hover:bg-black hover:text-white transition-colors"
          >
            Add to Cart
          </button>
          <button className="bg-white cursor-pointer py-1 px-10 rounded-2xl hover:bg-black hover:text-white transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
