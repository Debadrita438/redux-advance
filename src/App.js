import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { uiActions } from './store/uiSlice';

let isInitial = true;

const App = () => {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }
    
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
      body: JSON.stringify(cart)
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
  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification 
        status={notification.status} 
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        { showCart && <Cart /> }
        <Products />
      </Layout>
    </>
  );
}

export default App;
