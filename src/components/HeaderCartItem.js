import React from 'react'
import './HeaderCartItem.scss'

const HeaderCartItem = ({data}) => (
    <div className='HeaderCartItem flex ai'>
        <div className='background' style={{backgroundImage: `url(${data.imageUrl})`}}></div>
        <div>{data.name}<div className='price'>{`$${data.price} x ${data.qty}`}</div></div>
    </div>
)

export default HeaderCartItem;