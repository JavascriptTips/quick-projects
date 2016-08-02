import { combineReducers } from 'redux'

import basic from './basic.js'

export const mainReducers = {
  basic,
};

export const rootReducer = combineReducers(mainReducers);

