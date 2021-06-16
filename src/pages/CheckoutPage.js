import React, { useState, useEffect } from 'react'
import './CheckoutPage.scss';
import { connect } from 'react-redux';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';
import removeAllCartItemsAction from '../actions/removeAllCartItemsAction';
import CheckoutFooter from '../components/CheckoutFooter';

const CheckoutPage = ({ cartReducer, removeAllCartItemsAction }) => {
    var total = 0;
    const [message, setProcessed] = useState(({
        show: false,
        message: "Your cart is empty!",
    }));
    const orderHasBeenPlaced = () => {
        removeAllCartItemsAction("");
        setProcessed({ show: true, message: "You have successfully placed the order!" });
    }
    useEffect(() => {
    }, [cartReducer])
    return cartReducer.length > 0 ?
        <div className='CheckoutPage flex'>
            <div className='CheckoutPageContainer scrollbar grid mr'>
                {cartReducer.map((item, index) => {
                    total += (item.qty * item.price);
                    return <CartItem key={index} index={index} />
                })}
            </div>
            <CheckoutFooter total={total} onClick={orderHasBeenPlaced} cartReducer={cartReducer} />
        </div> :
        <div className='NothingInCart ai flex'>
            <h2>{message.message} {!message.show && <Link to='/shop' className='btn'>Start Shopping</Link>}</h2>
        </div>
}

const mapStateToProps = store => ({
    cartReducer: store.cartReducer
})

const mapDispatchToProps = dispatch => ({
    removeAllCartItemsAction: x => dispatch(removeAllCartItemsAction(x))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);