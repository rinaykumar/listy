import { combineReducers } from 'redux';
import listingReducer from './listingReducer';
import inquiryReducer from './inquiryReducer';
import userReducer from './userReducer';

export default combineReducers({
  // add your reducers here
  listingReducer,
  inquiryReducer,
  userReducer,
});
