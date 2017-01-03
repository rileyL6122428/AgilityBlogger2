import FilterableBlogList from '../classes/blog/FilterableBlogList.js'
import BlogActions from '../../../redux/actions/blog.actions.js';

function DashboardController ($ngRedux, $scope, blogRequestApi) {
  'ngInject';

  let vm = this;
  vm.userBlogs = new FilterableBlogList();
  vm.subscriptionToken = $ngRedux.connect(grabRelevantState, BlogActions)(vm);

  blogRequestApi.getUserBlogs({
    authorName: vm.currentUser.username
  });

  $scope.$on('$destroy', function () {
    vm.subscriptionToken();
 });

 function grabRelevantState(state) {
   return ({
     blogs: blogsForCurrentUser(state.blogs),
     currentUser: state.currentUser
   }); // I BELEIVE THIS OBJ IS BOUND TO THE CONTROLLER
 }

 function blogsForCurrentUser(blogs) {
   let userBlogs = [];

   for(var id in blogs) {
     let blog = blogs[id];
     if(blog.authorId === currentUser.id) userBlogs.push(blogs.id);
   }

   return userBlogs;
 }

}

export default DashboardController;
