

import { createContext, useContext, useState,ReactNode,useReducer, Dispatch } from 'react';

import cartReducer from './cartReducer';

interface Product {
  _id:string
  title:string
  supplier:string
  price:number
  imageUrl:string
  description:string
  product_Location:string
}

interface CartItem extends Product {
  quantity: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string };

// Define the type for the cart context
type CartContextType = {
  state: CartItem[];
  dispatch: Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType|undefined>(undefined);



export function CartProvider({ children }: { children: React.ReactNode }) {

  const initialState: CartItem[] = [];
  const [state,dispatch] = useReducer(cartReducer,initialState)



  return <CartContext.Provider value={{state,dispatch}}>{children}</CartContext.Provider>;

}





export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}