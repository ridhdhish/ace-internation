import { ADD_PRODUCT, SET_PRODUCTS } from "../types";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_PRODUCT: {
      const newProducts = [...state.products];
      newProducts.push({ ...payload.product });
      return {
        products: newProducts,
      };
    }
    case SET_PRODUCTS: {
      return {
        products: payload.products,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default productReducer;
