import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';

import uiSlice from './uiSlice';

const store = configureStore({
    reducer: {
        ui: uiSlice,
        cart: cartSlice
    }
})

export default store;