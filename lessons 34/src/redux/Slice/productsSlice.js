import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:5000/products");
    return response.json();
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.json();
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    if (!product._id) {
      return Promise.reject("Invalid product data");
    }

    const response = await fetch(
      `http://localhost:5000/products/${product._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || "Ошибка обновления");
    }

    return response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (_id) => {
    await fetch(`http://localhost:5000/products/${_id}`, { method: "DELETE" });
    return _id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (!action.payload || !action.payload._id) {
          return;
        }
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
