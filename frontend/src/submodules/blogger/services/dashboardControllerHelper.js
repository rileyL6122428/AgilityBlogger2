export default function DashboardControllerHelper() {
  return ({
    setState: (state) => {
      return ({
        blogs: _blogsForCurrentUser(state),
        currentUser: state.currentUser
      });
    }
  });

  function _blogsForCurrentUser(state) {
    let currentUserId = state.currentUser.id;
    let blogs = state.blogs;
    let userBlogs = [];

    for(var id in blogs) {
      let blog = blogs[id];
      if(blog.authorId === currentUserId) userBlogs.push(blogs[id]);
    }

    return userBlogs;
  }
}
