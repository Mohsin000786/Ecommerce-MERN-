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
            const existedItem = state.products.find(x => x._id == action.payload._id)
            if (existedItem) {
                return {
                    ...state,
                    products: state.products.map(x => x._id === existedItem._id ? 
                        { ...existedItem, quantity: existedItem.quantity + 1 } : x),
                    quantity: state.quantity + 1
                }
            }
            else {
                state.quantity += 1;
                state.products.push(action.payload)
            }
            state.total += action.payload.price * action.payload.quantity;
        },
        incQty: (state, action) => {
            const existedItem = state.products.find(x => x._id == action.payload._id)
            if (existedItem) {
                return {
                    ...state,
                    products: state.products.map(x => x._id === existedItem._id ? 
                        { ...existedItem, quantity: existedItem.quantity + 1 } : x),
                    quantity: state.quantity + 1,
                    total: state.total +  action.payload.price,
                }
            }
        },
        decQty: (state, action) => {
            const existedItem = state.products.find(x => x._id == action.payload._id)
            if (existedItem && existedItem.quantity > 1) {
                return {
                    ...state,
                    products: state.products.map(x => x._id === existedItem._id ? 
                        { ...existedItem, quantity: existedItem.quantity - 1} : x),
                    quantity: state.quantity - 1,
                    total: state.total - action.payload.price,
                }
            }
        },
        deleteItem: (state, action) => {
                return {
                    ...state,
                    products: state.products.filter((x) => x._id != action.payload._id)
                }
        }
    },
});

export const { addProduct, incQty, decQty, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;