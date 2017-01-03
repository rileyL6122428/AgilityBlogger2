import { addBlogs } from '../../../redux/actions/blog.actions.js';
export default function BlogRequestCBs($ngRedux, blogStore) {
  return ({
    getUserBlogsSuccessCB: (response) => {
      $ngRedux.dispatch(addBlogs(response.data.blogs));
    },

    getUserBlogsFailureCB: (response) => {
      alert("ERROR OCCURRED WHEN ATTEMPTING TO GET USER BLOGS");
    }
  });
}
