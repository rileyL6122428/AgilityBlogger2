import { BLOGS } from '../constants/blogs.js';

function addBlogs(blogData){
  debugger
    return ({
        type: BLOGS.ADD_BLOGS,
        payload: blogData
    });
}

export { addBlogs };
