import FilterableBlogList from '../classes/blog/FilterableBlogList.js'
import BlogActions from '../../../redux/actions/blog.actions.js';

function DashboardController ($ngRedux, $scope, blogRequestApi, dashboardControllerHelper) {
  'ngInject';

  let vm = this;

  let unsubscribeFromStoreCB = $ngRedux.connect(dashboardControllerHelper.setState, BlogActions)(vm);
  $scope.$on('$destroy', () => unsubscribeFromStoreCB());

  blogRequestApi.getUserBlogs({ authorName: vm.currentUser.username });
}

export default DashboardController;
