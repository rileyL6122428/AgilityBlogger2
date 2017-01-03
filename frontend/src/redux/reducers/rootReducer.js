import { combineReducers } from 'redux';
import { AuthReducer } from './authentication.reducer.js';
import { BlogsReducer }  from './blogs.reducer.js';

export const RootReducer = combineReducers({
    blogs: BlogsReducer,
    currentUser: AuthReducer
});
