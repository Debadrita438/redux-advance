import { uiActions } from './uiSlice';
import { cartActions } from './cartSlice';

export const fetchCartData = () => dispatch => {
    fetch('https://react-http-32f77-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')
    .then(response => response.json())
    .then(data => {
        dispatch(cartActions.replaceCart({
            items: data.items || [],  // Doing this because if no items then the cart is undefined and map wouldn't work on undefined
            totalQuantity: data.totalQuantity
        }))
    }).catch(err => {
        console.log(err.message);
        dispatch(uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Fetching cart data failed!'
        }))
    })
}

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
        body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity
        })
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