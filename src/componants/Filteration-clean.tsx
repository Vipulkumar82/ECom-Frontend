import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateFilteredProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Category {
  id: string;
  name: string;
}

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #7090d1;
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 20px;
    border: 3px solid #7090d1;
  }
`;

const Filteration = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Array<{min: number; max: number}>>([]);
  const previousFilteredProducts = useSelector((state:any)=>state.products) 
  const dispatch = useDispatch()

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedPriceRanges, categories]);

  const applyFilters = async () => {
    try {
      let filteredProducts = [...previousFilteredProducts.allProducts];

      // Apply category filters
      if (selectedCategories.length > 0 && categories.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
          // Find the category object that matches the product's category
          const matchingCategory = categories.find(cat => cat.id === product.category);
          return matchingCategory && selectedCategories.includes(matchingCategory.name);
        });
      }

      // Apply price range filters
      if (selectedPriceRanges.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          selectedPriceRanges.some(range =>
            product.price >= range.min && product.price <= range.max
          )
        );
      }

      if (filteredProducts.length > 0) {
        dispatch(updateFilteredProducts(filteredProducts));
        if (selectedCategories.length > 0 || selectedPriceRanges.length > 0) {
          toast.success('Filters applied successfully');
        }
      } else if (selectedCategories.length > 0 || selectedPriceRanges.length > 0) {
        toast.error('No products found with selected filters');
        // Reset filters if no products found
        dispatch(updateFilteredProducts(previousFilteredProducts.allProducts));
      }
    } catch (error) {
      console.error('Error applying filters:', error);
      toast.error('Failed to apply filters');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category];
      return newCategories;
    });
  };

  const handlePriceFilter = (min: number, max: number, checked: boolean) => {
    setSelectedPriceRanges(prev => {
      if (checked) {
        return [...prev, { min, max }];
      } else {
        return prev.filter(range => range.min !== min || range.max !== max);
      }
    });
  };

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);

  const fetchCategories = async () => {
    try {
      const catResponse = await fetch(`https://dummyjson.com/products/categories`);
      const catJson = await catResponse.json();
      
      // Process categories - API returns objects with slug and name
      const processedCategories = catJson.map((cat: any) => ({
        id: cat.slug,
        name: cat.name
      }));
      
      setCategories(processedCategories);
    } catch (error: any) {
      console.error('Failed to fetch categories:', error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-[92vh] bg-[#8AAAE5] w-1/6 p-4 shadow-lg">
      <style>{scrollbarStyles}</style>
      <h2 className="text-2xl font-bold text-white mb-6 text-center border-b border-white pb-3">
        Filter Products
      </h2>

      <div className="space-y-6">
        <div className="category-filter-section">
          <h3 className="text-xl font-bold text-white mb-3">Category</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
            {visibleCategories.map((cat: Category) => (
              <div key={cat.id} className="transform transition-all duration-200 hover:scale-102">
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-[#7090d1] p-2 rounded-lg transition-all group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      name={cat.name}
                      value={cat.name}
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => handleCategorySelect(cat.name)}
                    />
                    <div className="w-5 h-5 border-2 border-white rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white hidden peer-checked:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="font-medium text-white group-hover:text-white transition-colors capitalize">
                    {cat.name}
                  </span>
                </label>
              </div>
            ))}
          </div>
          {categories.length > 5 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="w-full mt-3 py-2 px-4 bg-[#7090d1] text-white rounded-lg hover:bg-[#5b7ac1] transition-colors flex items-center justify-center gap-2"
            >
              {showAllCategories ? (
                <>
                  Show Less <FaChevronUp />
                </>
              ) : (
                <>
                  Show More <FaChevronDown />
                </>
              )}
            </button>
          )}
        </div>

        <div className="price-filter-section">
          <h3 className="text-xl font-bold text-white mb-3">Price Range</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
            {[
              { id: 'price-1', range: '₹0 - ₹500', min: 0, max: 500 },
              { id: 'price-2', range: '₹500 - ₹1,000', min: 500, max: 1000 },
              { id: 'price-3', range: '₹1,000 - ₹10,000', min: 1000, max: 10000 },
              { id: 'price-4', range: '₹10,000 - ₹50,000', min: 10000, max: 50000 }
            ].map((priceRange) => (
              <div key={priceRange.id} className="transform transition-all duration-200 hover:scale-102">
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-[#7090d1] p-2 rounded-lg transition-all group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      name={priceRange.id}
                      checked={selectedPriceRanges.some(range => range.min === priceRange.min && range.max === priceRange.max)}
                      onChange={(e) => handlePriceFilter(priceRange.min, priceRange.max, e.target.checked)}
                    />
                    <div className="w-5 h-5 border-2 border-white rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white hidden peer-checked:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="font-medium text-white group-hover:text-white transition-colors">
                    {priceRange.range}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filteration;
