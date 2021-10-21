import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './uiSlice';

const initialState = {
    items: [],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;

            if(!existingItem) {
                state.items.push({ 
                    id: newItem.id, 
                    price: newItem.price, 
                    quantity: 1, 
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity --;

            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        }
    }
})

export const sendCartData = cartData => dispatch => {

    dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
    }))

    fetch('https://react-http-32f77-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(cartData)
    }).then(response => {
            dispatch(uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sent cart data successfully!'
        }))
    })
    .catch(err => {
        console.log(err.message);
        dispatch(uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!'
        }))
    })
    
}

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;