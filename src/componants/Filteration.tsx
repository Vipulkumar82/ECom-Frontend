import { useEffect, useState, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { updateFilteredProducts } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Category {
  id: string;
  name: string;
}

interface PriceRange {
  min: number;
  max: number;
}

interface ProductState {
  allProducts: any[];
  filteredProducts: any[];
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
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const productState: ProductState = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  // Memoized values for better performance
  const allProducts = useMemo(() => productState.allProducts || [], [productState.allProducts]);
  const hasProducts = useMemo(() => allProducts.length > 0, [allProducts]);
  const hasActiveFilters = useMemo(() => 
    selectedCategories.length > 0 || selectedPriceRanges.length > 0, 
    [selectedCategories.length, selectedPriceRanges.length]
  );

  // Optimized filtering logic with better error handling
  const applyFilters = useCallback(() => {
    if (!hasProducts) {
      console.log('No products available for filtering');
      return;
    }

    setIsLoading(true);
    
    try {
      let filteredProducts = [...allProducts];
      let appliedFiltersCount = 0;

      // Apply category filters
      if (selectedCategories.length > 0 && categories.length > 0) {
        const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
        
        filteredProducts = filteredProducts.filter(product => {
          const categoryName = categoryMap.get(product.category);
          return categoryName && selectedCategories.includes(categoryName);
        });
        appliedFiltersCount++;
        console.log(`Category filter applied: ${filteredProducts.length} products remaining`);
      }

      // Apply price range filters
      if (selectedPriceRanges.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
          const price = Number(product.price);
          return selectedPriceRanges.some(range => 
            price >= range.min && price <= range.max
          );
        });
        appliedFiltersCount++;
        console.log(`Price filter applied: ${filteredProducts.length} products remaining`);
      }

      // Update filtered products
      dispatch(updateFilteredProducts(filteredProducts));

      // Show appropriate feedback
      if (appliedFiltersCount > 0) {
        if (filteredProducts.length > 0) {
          toast.success(`Found ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`);
        } else {
          toast.error('No products match the selected filters');
        }
      }

    } catch (error) {
      console.error('Filter application error:', error);
      toast.error('Failed to apply filters');
    } finally {
      setIsLoading(false);
    }
  }, [allProducts, hasProducts, selectedCategories, selectedPriceRanges, categories, dispatch]);

  // Debounced filter application to prevent excessive calls
  useEffect(() => {
    const timeoutId = setTimeout(applyFilters, 100);
    return () => clearTimeout(timeoutId);
  }, [applyFilters]);

  // Category selection handler with validation
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(category);
      const newSelection = isSelected 
        ? prev.filter(cat => cat !== category)
        : [...prev, category];
      
      console.log(`Category ${isSelected ? 'deselected' : 'selected'}: ${category}`);
      return newSelection;
    });
  }, []);

  // Price filter handler with validation
  const handlePriceFilter = useCallback((min: number, max: number, checked: boolean) => {
    setSelectedPriceRanges(prev => {
      if (checked) {
        const newRange = { min, max };
        const exists = prev.some(range => range.min === min && range.max === max);
        return exists ? prev : [...prev, newRange];
      } else {
        return prev.filter(range => !(range.min === min && range.max === max));
      }
    });
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    if (hasProducts) {
      dispatch(updateFilteredProducts(allProducts));
      toast.success('All filters cleared');
    }
  }, [allProducts, hasProducts, dispatch]);

  // Fetch categories with better error handling
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid categories data format');
      }

      const processedCategories = data.map((cat: any) => ({
        id: cat.slug || cat.id || String(cat),
        name: cat.name || cat.slug || String(cat)
      }));
      
      setCategories(processedCategories);
      console.log(`Loaded ${processedCategories.length} categories`);
      
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories. Please refresh the page.');
    }
  }, []);

  // Initialize categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Force refresh filters (useful for debugging)
  const forceRefreshFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    if (hasProducts) {
      dispatch(updateFilteredProducts(allProducts));
      toast.success('Filters refreshed');
    }
  }, [allProducts, hasProducts, dispatch]);

  // Reset filters when products change
  useEffect(() => {
    if (hasProducts && !hasActiveFilters) {
      dispatch(updateFilteredProducts(allProducts));
    }
  }, [allProducts, hasProducts, hasActiveFilters, dispatch]);

  // Memoized visible categories
  const visibleCategories = useMemo(() => 
    showAllCategories ? categories : categories.slice(0, 5),
    [categories, showAllCategories]
  );

  // Price ranges configuration
  const priceRanges = useMemo(() => [
    { id: 'price-1', range: '₹0 - ₹500', min: 0, max: 500 },
    { id: 'price-2', range: '₹500 - ₹1,000', min: 500, max: 1000 },
    { id: 'price-3', range: '₹1,000 - ₹10,000', min: 1000, max: 10000 },
    { id: 'price-4', range: '₹10,000 - ₹50,000', min: 10000, max: 50000 }
  ], []);

  return (
    <div className="min-h-[92vh] bg-[#8AAAE5] w-1/6 p-4 shadow-lg">
      <style>{scrollbarStyles}</style>
      <div className="flex justify-between items-center mb-6 border-b border-white pb-3">
        <h2 className="text-2xl font-bold text-white">
          Filter Products {isLoading && <span className="text-xs">(Loading...)</span>}
        </h2>
        <button
          onClick={forceRefreshFilters}
          className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
          title="Refresh filters"
        >
          ↻
        </button>
      </div>

      <div className="space-y-6">
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="bg-[#7090d1] p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-bold text-white">Active Filters</h4>
              <button
                onClick={clearAllFilters}
                disabled={isLoading}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                Clear All
              </button>
            </div>
            {selectedCategories.length > 0 && (
              <div className="mb-2">
                <span className="text-xs text-white">Categories: </span>
                <span className="text-xs text-yellow-200">{selectedCategories.join(', ')}</span>
              </div>
            )}
            {selectedPriceRanges.length > 0 && (
              <div>
                <span className="text-xs text-white">Price Ranges: </span>
                <span className="text-xs text-yellow-200">
                  {selectedPriceRanges.map(range => `₹${range.min}-₹${range.max}`).join(', ')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Categories Section */}
        <div className="category-filter-section">
          <h3 className="text-xl font-bold text-white mb-3">
            Category {categories.length > 0 && <span className="text-sm">({categories.length})</span>}
          </h3>
          
          {categories.length === 0 ? (
            <div className="text-white text-sm opacity-75">Loading categories...</div>
          ) : (
            <>
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
                          disabled={isLoading}
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
                  disabled={isLoading}
                  className="w-full mt-3 py-2 px-4 bg-[#7090d1] text-white rounded-lg hover:bg-[#5b7ac1] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {showAllCategories ? (
                    <>
                      Show Less <FaChevronUp />
                    </>
                  ) : (
                    <>
                      Show More ({categories.length - 5} more) <FaChevronDown />
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>

        {/* Price Range Section */}
        <div className="price-filter-section">
          <h3 className="text-xl font-bold text-white mb-3">Price Range</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
            {priceRanges.map((priceRange) => (
              <div key={priceRange.id} className="transform transition-all duration-200 hover:scale-102">
                <label className="flex items-center space-x-3 cursor-pointer hover:bg-[#7090d1] p-2 rounded-lg transition-all group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer hidden"
                      name={priceRange.id}
                      checked={selectedPriceRanges.some(range => range.min === priceRange.min && range.max === priceRange.max)}
                      onChange={(e) => handlePriceFilter(priceRange.min, priceRange.max, e.target.checked)}
                      disabled={isLoading}
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

        {/* Debug Info (remove in production) */}
        {import.meta.env.DEV && (
          <div className="bg-gray-800 p-2 rounded text-xs text-white">
            <div>Products: {allProducts.length}</div>
            <div>Categories: {categories.length}</div>
            <div>Selected: {selectedCategories.length + selectedPriceRanges.length}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filteration;
