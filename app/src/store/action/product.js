import { ADD_PRODUCT, SET_PRODUCTS } from "../types";

export const addProduct = (productData) => async (dispatch, getState) => {
  // api call
  const response = await fetch("http://127.0.0.1:5000/create-product", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: productData,
  });

  const data = await response.json();

  dispatch({
    type: ADD_PRODUCT,
    payload: data,
  });
};

export const setProducts = () => async (dispatch, getState) => {
  // api call
  const response = await fetch("http://127.0.0.1:5000/products", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  dispatch({
    type: SET_PRODUCTS,
    payload: data,
  });
};
