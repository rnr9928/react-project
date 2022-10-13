import {createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cartState: false,
    cartItems: localStorage.getItem("목록")
        ? JSON.parse(localStorage.getItem("목록"))
        : [],
    cartTotalAmount: 0,
    cartTotalQantity: 0
};

const CartSlice = createSlice({
    initialState,
    name: "목록",
    reducers: {
        setOpenCart: (state, action) => {
            state.cartState = action.payload.cartState;
        },
        setCloseCart: (state, action) => {
            state.cartState = action.payload.cartState;
        },
        setAdd: (state, action) => {
            const itemIndex = state
                .cartItems
                .findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state
                    .cartItems[itemIndex]
                    .cartQuantity += 1;

                toast.success(`스킨+1`);
            } else {
                const temp = {
                    ...action.payload,
                    cartQuantity: 1
                };
                state
                    .cartItems
                    .push(temp);

                toast.success(`${action.payload.title} +스킨`);
            }

            localStorage.setItem("목록", JSON.stringify(state.cartItems));
        },

        setRemoveItemFromCart: (state, action) => {
            const removeItem = state
                .cartItems
                .filter((item) => item.id !== action.payload.id);

            state.cartItems = removeItem;
            localStorage.setItem("목록", JSON.stringify(state.cartItems));

            toast.success(`${action.payload.title} 스킨-1`);
        },

        setIncreaseItem: (state, action) => {
            const itemIndex = state
                .cartItems
                .findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state
                    .cartItems[itemIndex]
                    .cartQuantity += 1;

                toast.success(`스킨+1`);
            }
            localStorage.setItem("목록", JSON.stringify(state.cartItems));
        },

        setDecreaseItem: (state, action) => {
            const itemIndex = state
                .cartItems
                .findIndex((item) => item.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state
                    .cartItems[itemIndex]
                    .cartQuantity -= 1;

                toast.success(`스킨-1`);
            }
            localStorage.setItem("목록", JSON.stringify(state.cartItems));
        },

        setClearCartItems: (state, action) => {
            state.cartItems = [];
            toast.success(`비우기`);
            localStorage.setItem("목록", JSON.stringify(state.cartItems));
        },

        setGetTotals: (state, action) => {
            let {totalAmount, total} = state
                .cartItems
                .reduce((cartTotal, cartItem) => {
                    const {price, cartQuantity} = cartItem;
                    const totalPrice = price * cartQuantity;

                    cartTotal.totalAmount += totalPrice;
                    cartTotal.total += cartQuantity;

                    return cartTotal;
                }, {
                    totalAmount: 0,
                    total: 0
                });

            state.cartTotalAmount = totalAmount;
            state.cartTotalQantity = total;
        }
    }
});

export const {
    setOpenCart,
    setCloseCart,
    setAdd,
    setRemoveItemFromCart,
    setIncreaseItem,
    setDecreaseItem,
    setClearCartItems,
    setGetTotals
} = CartSlice.actions;

export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotal = (state) => state.cart.cartTotalQantity;

export default CartSlice.reducer;
