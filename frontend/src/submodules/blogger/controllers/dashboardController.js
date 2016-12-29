import FilterableBlogList from '../classes/blog/FilterableBlogList.js'
function DashboardController () {
  'ngInject';

  let vm = this;

  vm.userBlogs = new FilterableBlogList();
}

export default DashboardController;
