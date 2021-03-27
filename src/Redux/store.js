import { createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';


const store = createStore(rootReducer, applyMiddleware(logger));

const persistor = persistStore(store);

export {store, persistor};