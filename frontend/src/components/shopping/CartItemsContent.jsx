import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartItemQuantity } from '@/store/user/cartSlice'
import toast from 'react-hot-toast'

const CartItemsContent = ({ cartItem }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const handleCartItemDelete = (item) => {
    dispatch(deleteCartItem({ userId: user.id, productId: item.productId }))
      .then(() => toast.success('Item Deleted successfully'))
      .catch(() => toast.error('Failed to delete item'))
  }

  const handleUpdateQuantity = (cartItem, typeOfAction) => {
    const newQuantity = typeOfAction === 'plus'
      ? cartItem.quantity + 1
      : cartItem.quantity > 1
        ? cartItem.quantity - 1
        : cartItem.quantity;

    dispatch(updateCartItemQuantity({
      userId: user.id,
      items: [{productId: cartItem.productId, quantity: newQuantity}]
    }))
      .then((response) => {
        const { success, data } = response.payload;
        if (success) {
          toast.success('Cart item updated!')
        } else {
          toast.error('Failed to update cart item')
        }
      })
      .catch((error) => {
        toast.error('Failed to update cart item')
        console.log(error);
      })
  }

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md ring-2 ring-primary-300 w-full overflow-hidden">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover shadow-sm max-w-full"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-extrabold text-gray-900 truncate">{cartItem?.title}</h3>
        <div className="flex gap-2 items-center mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-gray-300 hover:bg-gray-100"
            onClick={() => handleUpdateQuantity(cartItem, 'minus')}
            disabled = {cartItem?.quantity === 1}
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </Button>
          <span className="text-lg font-semibold text-gray-800">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-gray-300 hover:bg-gray-100"
            onClick={() => handleUpdateQuantity(cartItem, 'plus')}
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end whitespace-nowrap">
        <p className="text-lg font-semibold text-gray-900">
          ${((cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-2 text-black hover:text-red-600" size={22} />
      </div>
    </div>
  )
}

export default CartItemsContent