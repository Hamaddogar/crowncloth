import React from 'react';
import './CollectionItem.scss';
import { connect } from 'react-redux';
import addToCartAction from '../actions/addToCartAction';

const CollectionItem = props => (
    <div className='CollectionItem'>
        <div className='background-image' style={{ backgroundImage: `url(${props.item.imageUrl})` }}>
            <div className='addToCart flex'><button className='no-select' onClick={() => props.addToCartAction(props.item)}>Add To Cart</button></div>
        </div>
        <div className='footer flex sb'>
            <span className='item-title'>{props.item.name}</span>
            <span>${props.item.price}</span>
        </div>
    </div>
)

const mapDispatchToProps = dispatch => ({
    addToCartAction: item => dispatch(addToCartAction(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);