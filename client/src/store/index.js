import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { authReducer } from './reducers/auth';
import { tourReducer } from './reducers/tour';
import { destinationReducer } from './reducers/destination';
import { reviewReducer } from './reducers/review';
import { blogReducer } from './reducers/blog';
import { bookingReducer } from './reducers/booking';
import { promotionReducer } from './reducers/promotion';
import { profileReducer } from './reducers/profile';
const rootReducer = combineReducers({
  auth: authReducer,
  tour: tourReducer,
  destination: destinationReducer,
  review: reviewReducer,
  blog: blogReducer,
  booking: bookingReducer,
  promotion: promotionReducer,
  profile: profileReducer,
});
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
