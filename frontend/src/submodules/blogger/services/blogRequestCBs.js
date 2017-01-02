import { addBlogs } from '../../../redux/actions/blog.actions.js';
export default function BlogRequestCBs($ngRedux, blogStore) {
  return ({
    getUserBlogsSuccessCB: (response) => {
      // blogStore.depositBlogs(response.data.blogs);

      debugger
      var action = addBlogs(response.data.blogs)
      $ngRedux.dispatch(action);

      debugger
      console.log("Attempted dispatch");
    },

    getUserBlogsFailureCB: (response) => {
      alert("ERROR OCCURRED WHEN ATTEMPTING TO GET USER BLOGS");
    }
  });
}
