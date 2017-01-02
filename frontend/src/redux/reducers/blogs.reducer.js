import { BLOGS } from '../constants/blogs.js';

const initialState = {};

export function BlogsReducer(state = initialState, action) {
  debugger
  switch(action.type) {
    case BLOGS.ADD_BLOGS:
      return _addBlogs(state, action.payload);
    default:
      return state;
  }

  function _addBlogs(state, blogDataList) {
    debugger
    let nextState = Object.assign({}, state);
    
    blogDataList.forEach((blogDataSet) => {
      nextState[blogDataSet.id] = {
        id: blogDataSet.id,
        name: blogDataSet.name,
        authorId: blogDataSet.author.id
      }
    });

    return nextState;
  }
}
