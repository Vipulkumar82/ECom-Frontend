import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

export interface Category {
  slug: string;
  name: string;
  url: string;
}

const Filteration = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const previousFilteredProducts = useSelector((state:any)=>state.products) 
  const dispatch = useDispatch()

  const fetchCategories = async () => {
    try {
      const catResponse = await fetch(`https://dummyjson.com/products/categories`);
      const catJson = await catResponse.json();
      setCategory((prev) => (prev = catJson));
    } catch (error: any) {
      console.log(error.message || "Failed to fetch categories");
      toast.error("Failed to fetch categories");
    }
  };

  const handleFilter = async (e:any) => {
    try {
      const filterResponse = await fetch(`https://dummyjson.com/products/category/${e.target.value}`);
      const filterJson = await filterResponse.json();
      dispatch(setProducts({products:[...filterJson.products,...previousFilteredProducts]}))
    } catch (error: any) {
      console.log(error.message || "Failed to fetch categories");
      toast.error("Failed to fetch categories");
    }
  }


  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="min-h-[92vh] bg-[#8AAAE5] w-1/6 p-4 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center border-b border-white pb-3">
        Filter Products
      </h2>

      <div className="space-y-6">
        <div className="category-filter-section">
          <h3 className="text-xl font-bold text-white mb-3">Category</h3>
          {category.map((c:Category) => (
            <div key={c.slug} className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                  name={c.slug}
                  value={c.slug}
                  onChange={handleFilter}
                />
                <span className="font-semibold text-white">{c.name}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="price-filter-section">
          <h3 className="text-xl font-bold text-white mb-3">Price Range</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="font-semibold text-white">₹0 - ₹500</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="font-semibold text-white">₹500 - ₹1,000</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="font-semibold text-white">₹1,000 - ₹10,000</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <span className="font-semibold text-white">
                ₹10,000 - ₹50,000
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filteration;
