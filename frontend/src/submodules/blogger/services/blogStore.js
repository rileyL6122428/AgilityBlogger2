import Blog from '../classes/blog/Blog.js';

export default function BlogStore() {
  'ngInject'

  var _blogs = {};

  return ({
    depositBlogs: (rawBlogs) => {
      rawBlogs.forEach((blogData) => _blogs[blogData.id] = new Blog(blogData));
    },

    getBlog: (blogId) => {
      return (_blogs[blogId]) ? _blogs[blogId] : null;
    },

    getBlogs: (authorId) => {
      let blogs = [];

      for(var id in _blogs) {
        let blog = _blogs[id];
        if(blog.getAuthorId() === authorId) { blogs.push(blog); }
      }

      return blogs;
    }
  });
}
