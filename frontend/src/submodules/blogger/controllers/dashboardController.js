import FilterableBlogList from '../classes/blog/FilterableBlogList.js'
import BlogActions from '../../../redux/actions/blog.actions.js';

function DashboardController ($ngRedux, $scope, blogRequestApi, authenticationStore) {
  'ngInject';

  let vm = this;
  vm.currentUser = authenticationStore.getCurrentUser();
  vm.userBlogs = new FilterableBlogList();
  vm.subscriptionToken = $ngRedux.connect(grabRelevantState, BlogActions)(vm);
  debugger

  blogRequestApi.getUserBlogs({
    authorName: vm.currentUser.username
  });

  $scope.$on('$destroy', function () {
    vm.subscriptionToken();
 });

 function grabRelevantState(state) {
   debugger
   console.log("H/W");

   return state;
 }
}

export default DashboardController;
