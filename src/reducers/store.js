import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
