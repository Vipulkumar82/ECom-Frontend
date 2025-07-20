import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import type { RootState } from '../redux/store';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(id);
      return;
    }
    dispatch(updateQuantity({ id, quantity: newQuantity }));
    toast.success('Quantity updated');
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-start gap-6"
            >
              <div className="relative w-32 h-32 min-w-[8rem]">
                <img
                  src={item.images?.[0] || item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'https://placehold.co/128x128?text=No+Image';
                  }}
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <div className="text-lg font-bold text-blue-600 mt-2">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <FaMinus className="text-gray-600" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <FaPlus className="text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Cart Total</h3>
              <p className="text-gray-600 mt-1">Including all taxes</p>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              ₹{total.toLocaleString()}
            </div>
          </div>
          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;