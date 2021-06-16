import React, { useContext } from 'react';
import StripCheckoutButton from './StripCheckoutButton';
import './CheckoutFooter.scss';
import AuthContext from '../context/auth-context';
import { auth } from '../firebase/firebase-utility';

const CheckoutFooter = ({ total, onClick, cartReducer }) => {
    const context = useContext(AuthContext);
    return (
        <div className='CheckoutFooter'>
            <h2 className='alert'>
                Please use the following test Card# for payments <br />
                4242 4242 4242 4242 -- Exp:01/20 -- CW:123
            </h2>
            <div className='card flex sb ai pd footer'>
                <h3>Total: ${total}</h3>
                {auth.currentUser ? <StripCheckoutButton price={total} onClick={onClick} orders={cartReducer} />: <button onClick={context.showLogin}>Checkout</button>}
            </div>
        </div>
    )
}

export default CheckoutFooter