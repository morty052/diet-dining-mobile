import { create } from "zustand";
import { TcartItem } from "../contexts/CartContext";
import Toast from "react-native-root-toast";

interface ICart {
  cartItems: TcartItem[] | [];
  itemsCount: number;
  addToCart: (item: TcartItem) => void;
  getCartTotal: () => number | undefined;
  decreaseItemQuantity?: (_id: string) => void;
  increaseItemQuantity?: (_id: string) => void;
  removeItemFromCart?: (_id: string) => void;
  total?: number;
}

const checkCartForItem = (_id: string, cartItems: TcartItem[]) => {
  const isAlreadyInCart = cartItems.find(
    (cartItem: TcartItem) => cartItem._id == _id
  );

  return isAlreadyInCart;
};

const increaseItemQuantity = (_id: string, state: ICart) => {
  const updatedCartItems = state.cartItems
    .map((item: TcartItem) => {
      if (item._id == _id) {
        const { quantity, price } = item;
        return {
          ...item,
          quantity: quantity + 1,
        };
      }
      return item;
    })
    .map((item: TcartItem) => {
      if (item._id == _id) {
        const { price, quantity } = item;
        return {
          ...item,
          total: price * quantity,
        };
      }
      return item;
    });
  console.info("updated cart", updatedCartItems);
  return updatedCartItems;
};

const increaseItemQuantityFromState = (_id: string, state: ICart) => {
  const updatedCartItems = state.cartItems
    .map((item: TcartItem) => {
      if (item._id == _id) {
        const { quantity, price } = item;
        return {
          ...item,
          quantity: quantity + 1,
        };
      }
      return item;
    })
    .map((item: TcartItem) => {
      if (item._id == _id) {
        const { price, quantity } = item;
        return {
          ...item,
          total: price * quantity,
        };
      }
      return item;
    });
  console.info("updated cart", updatedCartItems);
  return {
    cartItems: updatedCartItems,
    itemsCount: state.itemsCount + 1,
  };
};

const removeItemFromCart = (_id: string, state: ICart) => {
  const updatedCartItems = state.cartItems.filter(
    (cartItem: TcartItem) => cartItem._id != _id
  );

  console.info("removed item");
  return updatedCartItems;
};

const decreaseItemQuantity = (_id: string, state: ICart) => {
  // REDUCE QUANTITY VIA MAPPING ARRAY
  const updatedCartItems = state.cartItems.map((item: TcartItem) => {
    if (item._id == _id) {
      const { quantity, price, total } = item;
      return {
        ...item,
        quantity: quantity - 1,
        total: total && total - price,
      };
    }
    return item;
  });

  //   FIND UPDATED ITEM
  const updatedItem: TcartItem | undefined = updatedCartItems.find(
    (item: TcartItem) => item._id == _id
  );

  //   DESTRUCTURE QUANTITY FROM UPDATED ITEM IF IT EXISTS
  const { quantity } = updatedItem ?? { quantity: 0 };

  if (quantity > 0) {
    console.info("decreased quantity", updatedCartItems);
    return {
      ...state,
      itemsCount: state.itemsCount - 1,
      cartItems: updatedCartItems,
    };
  } else if (quantity <= 0) {
    const decreasedCartItems = removeItemFromCart(_id, state);
    return {
      ...state,
      itemsCount: state.itemsCount - 1,
      cartItems: decreasedCartItems,
    };
  }

  return state;
};

const getCartTotalFromState = (cartItems: TcartItem[]) => {
  const cartPrices = cartItems.map((item: TcartItem) => item.total);
  const total = cartPrices.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue,
    0
  );
  console.info("getting total", total);
  return total;
};

const addToCart = (item: TcartItem, state: ICart) => {
  // DESTRUCTURE ITEM
  const { price, _id, name, quantity, image } = item;

  // CHECK IF ITEM IS ALREADY IN CART
  const isAlreadyInCart = checkCartForItem(_id, state.cartItems);

  // ADD ITEM TO CART IF NOT PRESENT
  if (!isAlreadyInCart) {
    // SET INITIAL ITEM TOTAL TO ITEM PRICE MULTIPLIED BY INITIAL QUANTITY
    const newItem = {
      price,
      _id,
      name,
      quantity,
      image,
      total: price * quantity,
    };
    Toast.show("Added to cart.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: "#90C466",
      textColor: "#ffffff",
      opacity: 1,
    });
    return {
      ...state,
      itemsCount: state.itemsCount + 1,
      cartItems: [...state.cartItems, newItem],
    };

    //   UPDATE QUANTITY AND TOTAL PRICE OF ITEM IF PRESENT
  } else if (isAlreadyInCart) {
    console.info("Already in Cart");
    const updatedCartItems = increaseItemQuantity(_id, state);
    return {
      ...state,
      itemsCount: state.itemsCount + 1,
      cartItems: updatedCartItems,
    };
  }

  return state;
};

export const useCartStore = create<ICart>((set, state) => ({
  cartItems: [],
  itemsCount: 0,
  total: 0,
  //   addToCart: (item) =>
  //     set((state) => {
  //       const { price, _id, name, quantity } = item;
  //       const isAlreadyInCart = checkCartForItem(_id, state.cartItems);

  //       if (!isAlreadyInCart) {
  //         // SET INITIAL ITEM TOTAL TO ITEM PRICE MULTIPLIED BY INITIAL QUANTITY
  //         const newItem = {
  //           price,
  //           _id,
  //           name,
  //           quantity,
  //           total: price * quantity,
  //         };
  //         console.info("added Item to cart zustand", newItem);
  //         Toast.show("Added to cart.", {
  //           duration: Toast.durations.LONG,
  //           position: Toast.positions.BOTTOM,
  //           backgroundColor: "#90C466",
  //           textColor: "#ffffff",
  //           opacity: 1,
  //         });
  //         return { state, cartItems: [...state.cartItems, newItem] };

  //         //   UPDATE QUANTITY AND TOTAL PRICE OF ITEM IF PRESENT
  //       } else if (isAlreadyInCart) {
  //         console.info("Already in Cart");
  //         const updatedCartItems = state.cartItems
  //           .map((item: TcartItem) => {
  //             if (item._id == _id) {
  //               const { quantity, price } = item;
  //               return {
  //                 ...item,
  //                 quantity: quantity + 1,
  //               };
  //             }
  //             return item;
  //           })
  //           .map((item: TcartItem) => {
  //             if (item._id == _id) {
  //               const { price, quantity } = item;
  //               return {
  //                 ...item,
  //                 total: price * quantity,
  //               };
  //             }
  //             return item;
  //           });
  //         console.info("updated cart zustand", updatedCartItems);
  //         return { ...state, cartItems: [updatedCartItems] };
  //       }
  //     }),
  addToCart: (item) => {
    set((state) => addToCart(item, state));
  },
  decreaseItemQuantity: (_id) => {
    console.info("decreasing quantity from zustand", _id);
    set((state) => decreaseItemQuantity(_id, state));
  },
  increaseItemQuantity: (_id) => {
    console.info("increasing quantity from zustand", _id);
    set((state) => increaseItemQuantityFromState(_id, state));
  },
  getCartTotal: () => {
    const { cartItems } = state();
    const total = getCartTotalFromState(cartItems);
    console.log("total", total);
    return total;
  },
}));
