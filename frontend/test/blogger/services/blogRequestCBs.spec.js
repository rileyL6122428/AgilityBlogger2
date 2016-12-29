import angular from 'angular';
import 'angular-mocks';
import bloggerModule from '../../../src/submodules/blogger/bloggerModule.js';
import SampleBlogData from '../utils/dataFactories/BlogDataFactory.js';

const {inject, module} = angular.mock;

describe("blogRequestCBs", () => {

  let blogRequestCBs, blogStoreMock;

  beforeEach(module(bloggerModule));

  beforeEach(() => {
    module(($provide) => {
      $provide.service('blogStore', function() {
        this.storeBlogs = jasmine.createSpy('storeBlogs');
      });
    });
  });

  beforeEach(inject((_blogRequestCBs_, _blogStore_) => {
    blogRequestCBs = _blogRequestCBs_;
    blogStoreMock = _blogStore_;
  }));

  it("should be registered in the module", () => {
    expect(blogRequestCBs).toBeDefined();
  });

  describe("#getUserBlogsSuccessCB", () => {
    it("should call blogStore#storeBlogs", () => {
      let sampleBlog = SampleBlogData({ id: 1, authorId: 1 });
      let sampleResponse = { data: { blogs: [sampleBlog] } };

      blogRequestCBs.getUserBlogsSuccessCB(sampleResponse);
      expect(blogStoreMock.storeBlogs).toHaveBeenCalledWith(sampleResponse.data.blogs);
    });
  });
})
