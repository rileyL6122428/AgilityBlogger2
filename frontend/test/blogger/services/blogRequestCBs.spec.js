import angular from 'angular';
import 'angular-mocks';
import bloggerModule from '../../../src/submodules/blogger/bloggerModule.js';
import SampleBlogData from '../utils/dataFactories/BlogDataFactory.js';

const {inject, module} = angular.mock;

describe("blogRequestCBs", () => {

  let blogRequestCBs, $ngRedux;

  beforeEach(module(bloggerModule));

  beforeEach(() => {
    module(($provide) => {
      $provide.value('$ngRedux', { dispatch: (action) => {} });
      $provide.value('$scope', { "$on": (lifecycleEvent, cb) => {} });
    });
  });

  beforeEach(inject((_blogRequestCBs_, _$ngRedux_, $scope) => {
    blogRequestCBs = _blogRequestCBs_;
    $ngRedux = _$ngRedux_;
  }));

  it("should be registered in the module", () => {
    expect(blogRequestCBs).toBeDefined();
  });

  describe("#getUserBlogsSuccessCB", () => {
    it("should store blogs", () => {
      spyOn($ngRedux, "dispatch");
      let sampleBlog = SampleBlogData({ id: 1, authorId: 1 });
      let sampleResponse = { data: { blogs: [sampleBlog] } };
      blogRequestCBs.getUserBlogsSuccessCB(sampleResponse);

      expect($ngRedux.dispatch).toHaveBeenCalledWith({
        type: "ADD_BLOGS",
        payload: sampleResponse.data.blogs
      });
    });
  });
})
