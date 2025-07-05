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
  return (
    <div className="w-74 my-4">
      <div className=" bg-[#8AAAE5] w-full rounded-2xl flex flex-col pb-2">
        <div className="h-64 w-full overflow-hidden p-2">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>
        <div className="ml-4 ">
          <h3 className="text-xl font-semibold tracking-wide">Title:{title}</h3>
          <p>Description:{description.substring(0, 50)}...</p>
          <h2 className=" font-bold tracking-wide">
            Rs: {price.toLocaleString()}
          </h2>
        </div>
        <div className="mt-2 flex justify-around">
          <button className="bg-[#4681f4] py-1 px-10 rounded-2xl cursor-pointer hover:bg-[#7090d1] p-2 transition-colors">
            Cart
          </button>
          <button className="bg-white py-1 px-10 rounded-2xl cursor-pointer hover:bg-[#7090d1] p-2 transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
