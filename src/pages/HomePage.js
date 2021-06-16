import React, {useEffect} from 'react';
import './HomePage.scss';
import { connect } from 'react-redux';
import MenuItem from '../components/MenuItem';

const HomePage = ({directoryReducer}) => {
    useEffect(() =>{
    }, [directoryReducer])
    return(
        <div className='flex wrap HomePage'>
            {directoryReducer.map(section => <MenuItem section={section} key={section.id} />)}
        </div>
    )
}


const mapStateToProps = ({directoryReducer}) => ({directoryReducer: directoryReducer});
export default connect(mapStateToProps)(HomePage);