const Filteration = () => {
  return (
    <div className="min-h-[92vh] bg-[#8AAAE5] w-1/6 p-4 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center border-b border-white pb-3">
        Filter Products
      </h2>

      <div className="space-y-6">
        <div className="filter-section">
          <h3 className="text-xl font-bold text-white mb-3">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="font-semibold text-white">Electronics</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="font-semibold text-white">Books</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="font-semibold text-white">Grocery</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="font-semibold text-white">Fashion</span>
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h3 className="text-xl font-bold text-white mb-3">Price Range</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="font-semibold text-white">₹0 - ₹500</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="font-semibold text-white">₹500 - ₹1,000</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="font-semibold text-white">₹1,000 - ₹10,000</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-[#7090d1] p-2 rounded-md transition-colors">
              <input type="checkbox" className="w-4 h-4 accent-blue-600" />
              <span className="font-semibold text-white">₹10,000 - ₹50,000</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filteration;
