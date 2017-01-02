import { combineReducers } from 'redux';
import { BlogsReducer }  from './blogs.reducer.js';

export const RootReducer = combineReducers({
    blogs: BlogsReducer
});
