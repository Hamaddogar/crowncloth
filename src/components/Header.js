import React, { useContext, useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import { auth } from '../firebase/firebase-utility';
import Logo from '../assets/logo.svg'
import HeaderCart from './HeaderCart';

const Header = () => {
    const context = useContext(AuthContext);
    const [clas, setClass] = useState('');
    const navHandler = () => clas === '' ? setClass('open') : setClass('');
    return (
        <nav>
            <header className={`${clas} flex-block card sb ai`}>
                <div className='flex logo'>
                    <Link to='/' className='no-select'>
                        <img src={Logo} alt='' />
                    </Link>
                    <button
                        className={`menu-icon ${clas === 'open' ? 'close-menu' : ''}`}
                        onClick={navHandler}
                        onBlur={() => setClass('')}
                    >
                        <span className='rotate'></span>
                        <span className='norotate'></span>
                        <span className='rotate1'></span>
                    </button>
                </div>
                <div className='options flex-block'>
                    <Link to='/shop'>Shop</Link>
                    {auth.currentUser ?
                        <span className='link' onClick={() => auth.signOut()}>Logout</span> :
                        <span className='link' onClick={context.showLogin}>Login</span>
                    }
                    <HeaderCart></HeaderCart>
                </div>
            </header>
        </nav>
    )
}

export default Header;