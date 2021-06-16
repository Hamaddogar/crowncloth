import { createStore, combineReducers, applyMiddleware } from 'redux';
import cartReducer from './reducers/cartReducer';
import directoryReducer from './reducers/directoryReducer';
import collectionsReducer from './reducers/collectionsReducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const allReducers = combineReducers({
    cartReducer,
    directoryReducer,
    collectionsReducer
})

const store = createStore(allReducers, applyMiddleware(...middlewares));

export default store;