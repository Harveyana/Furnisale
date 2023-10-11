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

type AddToCartAction = {
    type: 'ADD_TO_CART';
    payload: CartItem;
};

type RemoveFromCartAction = {
    type: 'REMOVE_FROM_CART';
    payload: string; // Assuming payload is the item ID to be removed
};

type IncreaseQuantity = {
    type: 'INCREASE_QUANTITY';
    payload: string; // Assuming payload is the item ID to be removed
};

type DecreaseQuantity = {
    type: 'DECREASE_QUANTITY';
    payload: string; // Assuming payload is the item ID to be removed
};

type CartAction = (AddToCartAction | RemoveFromCartAction | IncreaseQuantity |DecreaseQuantity);


export default function cartReducer(state:CartItem[],action:CartAction) {

    switch (action.type) {
        case 'ADD_TO_CART':
          // Check if the item is already in the cart
          const existingItemIndex = state.findIndex(
            (item) => item._id === action.payload._id
          );
    
          if (existingItemIndex !== -1) {
            // If it exists, update the quantity
            state[existingItemIndex].quantity += action.payload.quantity;
            console.log([...state])
            return [...state];
          } else {
            // If it doesn't exist, add it to the cart
            console.log([...state,action.payload])
            return [...state, action.payload];
        }

        case 'REMOVE_FROM_CART':
        // Find the index of the item to be removed
            const itemIndexToRemove = state.findIndex(
                (item) => item._id === action.payload
            );

            if (itemIndexToRemove !== -1) {
                // If found, remove the item from the cart
                state.splice(itemIndexToRemove, 1);
                return [...state];
            } else {
                // If item not found, return the current state
                return state;
        }

        case 'INCREASE_QUANTITY':
            console.log('increase quantity')
            
            return state.map((item) =>
            item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        )

        case 'DECREASE_QUANTITY':
            return state.map((item) =>
            item._id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )

        default:
          return state;
    }
}