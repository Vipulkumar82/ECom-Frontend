const ProductCard = () => {
  return (
    <div className="w-74 bg-green-600 my-4">
      <div className=" bg-[#8AAAE5] w-full h-80 flex flex-col">
      <img className="h-48 w-full p-4 object-center"  src="https://rukminim2.flixcart.com/image/312/312/xif0q/computer/f/w/u/-original-imahbwnhkgr5p46r.jpeg?q=70" alt="Product img"></img>
      <div className="ml-4 ">
          <h3 className="text-xl font-semibold tracking-wide">Product Name</h3>
          <p>Description</p>
          <h2 className=" font-bold tracking-wide">Rs: 50,0000</h2>
      </div>
      <div className="mt-2 flex justify-around">
        <button className="bg-white py-1 px-10 rounded-2xl cursor-pointer hover:bg-[#7090d1] p-2 transition-colors">Cart</button>
        <button className="bg-white py-1 px-10 rounded-2xl cursor-pointer hover:bg-[#7090d1] p-2 transition-colors">Details</button>
      </div>
    </div>
    </div>
  )
}

export default ProductCard