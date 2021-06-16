import React from 'react';
import './CartItem.scss';
import { connect } from 'react-redux';
import addToCartAction from '../actions/addToCartAction';
import decreaseCartQtyAction from '../actions/decreaseCartQtyAction';
import removeCartItemAction from '../actions/removeCartItemAction';
import increaseCartQtyAction from '../actions/increaseCartQtyAction';

const CartItem = props => {
    const item = props.cartReducer[props.index]
    return (
        <div className='CartItem flex ai pd'>
            {console.log(item)}
            <div className='background' style={{ backgroundImage: `url(${item.imageUrl})` }}>
                <div></div>
            </div>
            <span className='title'>{item.name}</span>
            <span className='flex ai no-select'>
                <i className="arrow left" onClick={() => props.decreaseCartQtyAction(props.index)}></i>
                <span className='qty'>{item.qty}</span>
                <i className="arrow right" onClick={() => props.increaseCartQtyAction(props.index)}></i>
            </span>
            <span className='totalPrice'>${item.price * item.qty}</span>
            <span className="close icon" onClick={() => props.removeCartItemAction(props.index)}></span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addToCartAction: item => dispatch(addToCartAction(item)),
    increaseCartQtyAction: index => dispatch(increaseCartQtyAction(index)),
    decreaseCartQtyAction: index => dispatch(decreaseCartQtyAction(index)),
    removeCartItemAction: index => dispatch(removeCartItemAction(index))
})
const mapStateToProps = ({ cartReducer }) => ({
    cartReducer: cartReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);