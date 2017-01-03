import BlogActions from '../../../redux/actions/blog.actions.js';
import FilteredListFactory from '../classes/FilteredListFactory.js';

export default function DashboardController ($ngRedux, $scope, blogRequestApi) {
  'ngInject';

  let vm = this;

  setupStoreListener();
  fetchUserBlogs();
  setPageInteractionCBs();

  function setupStoreListener() {
    let unsubscribeFromStoreCB = $ngRedux.connect(_setState, BlogActions)(vm);
    $scope.$on('$destroy', () => unsubscribeFromStoreCB());
  }

  function fetchUserBlogs() {
    blogRequestApi.getUserBlogs({ authorName: vm.currentUser.username });
  }

  function setPageInteractionCBs() {
    vm.updateList = () => vm.userBlogs = vm.listFactory.getFilteredList();
  }

  function _setState(state) {
    let currentUser = state.currentUser;
    let userBlogs = _currentUserBlogs(state);
    let listFactory = new FilteredListFactory({
      filterBy: "name",
      items: userBlogs,
    });
    return ({currentUser, userBlogs, listFactory});
  }

  function _currentUserBlogs(state) {
    let userBlogs = [];
    for(var id in state.blogs) {
      let blog = state.blogs[id];
      if(blog.authorId === state.currentUser.id) userBlogs.push(state.blogs[id]);
    }
    return userBlogs;
  }
}
