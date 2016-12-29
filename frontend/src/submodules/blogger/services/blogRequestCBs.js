export default function BlogRequestCBs(blogStore) {
  return ({
    getUserBlogsSuccessCB: (response) => {
      blogStore.storeBlogs(response.data.blogs);
    },

    getUserBlogsFailureCB: (response) => {
      alert("ERROR OCCURRED WHEN ATTEMPTING TO GET USER BLOGS");
    }
  });
}
