import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const existingProduct = state.products.find(product => product._id === action.payload._id);

            if (existingProduct) {
                // If the product is already in the cart, increase its quantity
                existingProduct.quantity += action.payload.quantity;
            } else {
                // If it's a new product, add it to the cart
                state.quantity += 1;
                state.products.push(action.payload);
            }
            // Update the total price
            state.total += action.payload.price * action.payload.quantity;
        },
        // Action to remove a product from the cart
        removeFromCart: (state, action) => {
            const productId = action.payload; // Get the product ID from the action payload
            const productIndex = state.products.findIndex(product => product._id === productId); // Find the product index in the cart

            if (productIndex !== -1) {
                // If the product exists in the cart
                const product = state.products[productIndex];
                state.quantity -= 1; // Decrease the quantity
                state.total -= product.price * product.quantity; // Decrease the total price
                state.products.splice(productIndex, 1); // Remove the product from the cart
            }
        },
        // Action to increase the quantity of a product in the cart
        increaseQuantity: (state, action) => {
            const productId = action.payload; // Get the product ID from the action payload
            const product = state.products.find(product => product._id === productId); // Find the product in the cart

            if (product) {
                product.quantity += 1; // Increase the product quantity
                state.total += product.price; // Update the total price
            }
        },
        // Action to decrease the quantity of a product in the cart
        decreaseQuantity: (state, action) => {
            const productId = action.payload; // Get the product ID from the action payload
            const product = state.products.find(product => product._id === productId); // Find the product in the cart

            if (product && product.quantity > 1) {
                product.quantity -= 1; // Decrease the product quantity
                state.total -= product.price; // Update the total price
            } else if (product && product.quantity === 1) {
                // If the quantity is 1, remove the product from the cart
                state.products = state.products.filter(product => product._id !== productId);
                state.quantity -= 1;
                state.total -= product.price;
            }
        },
    },
});

// Export actions
export const { addProduct, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
