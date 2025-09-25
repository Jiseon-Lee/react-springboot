import { configureStore, createSlice } from "@reduxjs/toolkit";

// 장바구니 slice
const cart = createSlice({
    name: "cart",
    initialState: [
        {
            id: 11,
            imgurl: "11_1.jpg",
            name: "스탠다드",
            startDate: "2025-05-15",
            endDate: "2025-05-16",
            adults: 2,
            children: 0,
            infants: 0,
            price: 313500,
            count: 1, 
        },
    ],
    reducers: {
        // 상품 추가
        addItem(state, action) {
            state.push({ ...action.payload, count: 1 });
        },

        // 상품 삭제
        deleteItem(state, action) {
            return state.filter((item) => item.id !== action.payload);
        },
    },
});

// action 함수 export
export const { addItem, deleteItem } = cart.actions;

// Redux store 생성 및 export
export default configureStore({
    reducer: {
        cart: cart.reducer,
    },
});