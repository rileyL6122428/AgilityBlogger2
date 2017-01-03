import { BLOGS } from '../constants/blogs.js';

function addBlogs(blogData){
    return ({
        type: BLOGS.ADD_BLOGS,
        payload: blogData
    });
}

export { addBlogs };
