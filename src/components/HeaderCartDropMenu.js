import React from 'react';
import HeaderCartItem from './HeaderCartItem';
import { connect } from 'react-redux';
import './HeaderCartDropMenu.scss';
import { Link } from 'react-router-dom';

const HeaderCartDropMenu = ({ cart }) => (
    <div className='HeaderCartDropMenu'>
        <div className='card pd'>
            <div className='grid scrollbar'>
                {cart.map(item => <HeaderCartItem key={item.id} data={item} />)}
            </div>
            <Link to='/checkout' className='btn'>Go To Checkout</Link>
        </div>
    </div>
)

const mapStateToProps = ({ cartReducer }) => ({
    cartReducer: cartReducer
})

export default connect(mapStateToProps)(HeaderCartDropMenu);