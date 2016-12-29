import FilterableBlogList from '../classes/blog/FilterableBlogList.js'
function DashboardController (blogRequestApi, authenticationStore) {
  'ngInject';

  let vm = this;

  vm.userBlogs = new FilterableBlogList();

  blogRequestApi.getUserBlogs({
    authorName: authenticationStore.getCurrentUser().username // getCurrentUser
  });
}

export default DashboardController;
