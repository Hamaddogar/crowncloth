import React from 'react';
import './MenuItem.scss';
import {Link} from 'react-router-dom'

const MenuItem = ({ section }) => (
    <Link to={section.linkUrl} className='menu-item f1'>
        <div className='background-image flex' style={{ backgroundImage: `url(${section.imageUrl})` }}>
            <div className='content'>
                <h3 className='title'>{section.title}</h3>
                <span className='subtitle'>Shop Now</span>
            </div>
        </div>
    </Link>
)

export default MenuItem;