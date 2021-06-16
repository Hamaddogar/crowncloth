import React from 'react'
import './HeaderCart.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cart from '../assets/cart.svg';
import HeaderCartDropMenu from './HeaderCartDropMenu';

const HeaderCart = ({ cartReducer }) => {
    let totalItems = 0;
    for (let item of cartReducer) {
        totalItems += item.qty;
    }
    return (
        <div className="HeaderCart">
            <div className='link shoping-cart'>
                {totalItems > 0 && <span>{totalItems}</span>}
                <img src={cart} width='19' className='hs' alt='' />
                <Link to='/checkout' className='ss'>
                    <img src={cart} width='19' alt='' />
                </Link>
            </div>
            {cartReducer.length > 0 && <HeaderCartDropMenu cart={cartReducer} />}
        </div>
    )
}

const mapStateToProps = ({ cartReducer }) => ({
    cartReducer: cartReducer
})

export default connect(mapStateToProps)(HeaderCart);