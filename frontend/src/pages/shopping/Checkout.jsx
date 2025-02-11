import React from 'react'
import image from '../../assets/image.png'
import Address from '@/components/shopping/Address'
import { useSelector } from 'react-redux'
import CartItemsContent from '@/components/shopping/CartItemsContent'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Checkout = () => {
  const { cartItems } = useSelector(state => state.userCart)

  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
    cartItems.items.reduce((sum, currentItem) => sum + (
      currentItem?.salePrice > 0 ?
        currentItem?.salePrice : currentItem?.price
    ) * currentItem?.quantity, 0) : 0

    function handleCheckout() {
      toast.success('Woohoo! 🎉 Your order is confirmed. We’ll update you soon!',{
        duration: 5000
      });
    }
    

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Title */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Checkout
          </h1>
        </div>

        {/* Image */}
        <div className="relative h-[250px] w-full overflow-hidden rounded-lg shadow-md">
          <img src={image} className="h-full w-full object-cover object-center" alt="Checkout Banner" />
        </div>

        {/* Checkout Card */}
        <Card className="bg-white rounded-lg shadow-2xl p-8 space-y-6 ring-2 ring-primary-300">
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Address Section */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <Address key={cartItems} />
              </div>

              {/* Cart Items Section */}
              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col gap-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 shadow-lg">
                  
                  {/* Title */}
                  <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Cart Items</h1>
                  </CardTitle>
                  
                  {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                    cartItems.items.map(cartItem => (
                      <CartItemsContent key={cartItem.id} cartItem={cartItem} />
                    ))
                  ) : (
                    <p className="text-gray-600 text-center">Your cart is empty.</p>
                  )}

                  {/* Total Amount */}
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-gray-800">${totalCartAmount}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <div className="mt-4 w-full">
                    <Button onClick={handleCheckout}>
                      Place Order
                    </Button>
                  </div>

                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;