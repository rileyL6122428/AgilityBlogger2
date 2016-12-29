import FilterableBlogList from '../classes/blog/FilterableBlogList.js'
function DashboardController (blogRequestApi, authenticationStore) {
  'ngInject';

  let vm = this;

  vm.currentUser = authenticationStore.getCurrentUser();
  vm.userBlogs = new FilterableBlogList();

  blogRequestApi.getUserBlogs({
    authorName: vm.currentUser.getUsername()
  });
}

export default DashboardController;
