import React from 'react';
import StripCheckout from 'react-stripe-checkout';
import logo from '../assets/logo.svg';
import options from '../options';
import { storeUserOrderHistory } from '../firebase/firebase-utility';

const StripCheckoutButton = ({ price, onClick, orders }) => {
    const priceForStrip = price * 100;
    const publishKey = "pk_test_F57v40XOmsTJmJ4TyFhOGuXW00IbJIqQZF";
    const onToken = token => storeUserOrderHistory(options({ amount: priceForStrip, token }), orders, onClick);

    return (
        <StripCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress=""
            shippingAddress=""
            description={`Your total is $${price}`}
            amount={priceForStrip}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishKey}
            image={logo}
            onClick={()=>console.log('clicked')}
        />
    )
}

export default StripCheckoutButton;