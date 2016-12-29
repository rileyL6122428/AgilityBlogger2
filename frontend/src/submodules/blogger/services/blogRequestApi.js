export default function BlogRequestApi($http, blogRequestCBs) {
  'ngInject'

  return ({
    getUserBlogs:(data) => {
      $http({
        url: "/api/userBlogs",
        method: "GET",
        params: data,
      }).then(
        blogRequestCBs.getUserBlogsSuccessCB,
        blogRequestCBs.getUserBlogsFailureCB
      );
    }
  });
}
