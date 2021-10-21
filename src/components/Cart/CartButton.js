import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice';
import classes from './CartButton.module.css';

const CartButton = props => {
    const dispatch = useDispatch();
    const quantity = useSelector(state => state.cart.totalQuantity)

    const toggleCartHandler = () => {
        dispatch(uiActions.toggleCart())
    }

    return (
        <button className={classes.button} onClick={toggleCartHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{quantity}</span>
        </button>
    );
};

export default CartButton;
