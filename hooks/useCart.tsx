import {useState, useEffect} from 'react'
import axios from 'axios'
import React from 'react'

type furniture = {
    _id:string
    title:string
    supplier:string
    price:number
    imageUrl:string
    description:string
    product_Location:string
    quantity:number
}


const useCart = () => {
    const [cart, setCart] = React.useState<furniture[]>([]);
    const [total, setTotal] = useState(0)

    const addItemToCart = (item:furniture) => {
        (cart.length)? setCart((prevCart)=>[...prevCart, item])
        : setCart([item]);
        console.log(cart)
        calculateTotalPrice()
    }


    const removeItemFromCart = (itemId:string) => {
        const updatedCart = cart.filter(item => item._id !== itemId);
        setCart(updatedCart);
        calculateTotalPrice()
    }


    const increaseItemQuantity = (itemId:string) => {
        const updatedCart = cart.map(item => {
          if (item._id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCart(updatedCart);
        calculateTotalPrice()
    }


    const decreaseItemQuantity = (itemId:string) => {
        const updatedCart = cart.map(item => {
          if (item._id === itemId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCart(updatedCart);
        calculateTotalPrice()
    }

    const calculateTotalPrice = () => {
        const totalprice = cart.reduce((total, item:furniture) => {
          return total + item.price * item.quantity;
        }, 0);
        setTotal(totalprice);
        console.log(total)
    }

  return {cart,total,addItemToCart,removeItemFromCart,increaseItemQuantity,decreaseItemQuantity,calculateTotalPrice}
}

export default useCart