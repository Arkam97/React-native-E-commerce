import React, { createContext, useState } from "react";
import { getItem } from "../api/Item";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [wishList, setWishList] = useState([]);

  const getItemsCount = () => {
    return cartList.reduce((sum, item) => sum + item.qty, 0);
  };

  const getTotalPrice = () => {
    return cartList.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const addToCart = async (id) => {
    const product = await getItem(id);
    setCartList((prevItems) => {
      const item = prevItems?.find((item) => item.id == id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            product,
            totalPrice: parseInt(product.price),
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id == id) {
            item.qty++;
            item.totalPrice += parseInt(product.price);
          }
          return item;
        });
      }
    });
  };

  const decCartQuantity = async (id) => {
    const product = await getItem(id);
    setCartList((prevItems) => {
      return prevItems.map((item) => {
        if (item.id == id) {
          item.qty--;
          item.totalPrice -= product.price;
        }
        return item;
      });
    });
  };
  const clearCart = () => {
    setCartList([]);
  };

  const removeCartItem = (id) => {
    setCartList((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const addOrRemoveFromWishList = (id) => {
    const product = getItem(id);
    setWishList((prevItems) => {
      const item = prevItems.find((item) => item.id == id);
      if (!item) {
        return [
          ...prevItems,
          {
            product,
          },
        ];
      } else {
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  return (
    <ItemContext.Provider
      value={{
        cartList,
        setCartList,
        wishList,
        setWishList,
        addToCart,
        clearCart,
        removeCartItem,
        decCartQuantity,
        getItemsCount,
        getTotalPrice,
        addOrRemoveFromWishList,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
