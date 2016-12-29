import angular from 'angular';
import 'angular-mocks';
import bloggerModule from '../../../src/submodules/blogger/bloggerModule.js';
import Blog from '../../../src/submodules/blogger/classes/blog/Blog.js';

const {inject, module} = angular.mock;

describe("blogStore", () => {

  let blogStore;
  let rawBlog1, rawBlog2, rawBlog3;

  beforeEach(module(bloggerModule));

  beforeEach(inject((_blogStore_) => {
    blogStore = _blogStore_;
  }));

  beforeEach(() => {
    rawBlog1 = _createSampleRawBlog({ id: 1 });
    rawBlog2 = _createSampleRawBlog({ id: 2 });
    rawBlog3 = _createSampleRawBlog({ id: 3 });
  });

  it("should be wired into the module", () => {
    expect(blogStore).toBeDefined();
  });

  xit("should store blog data as instances of the Blog class");

  describe("#getBlog", () => {
    xit("should return a blog when a blog of the provided id is stored");
    xit("should return null when a blog of the provided id is not stored");
  });

  describe("#getUserBlogs", () => {
    xit("should return a list of blogs when blogs with the provided author id are present");
    xit("should return an empty list when there are no blogs with the corresponding author id present");
  });

  function _createSampleRawBlog(params) {
    return ({
      id: params.id,
      author: { id: 1 },
      name: "blog" + id,
      posts: []
    });
  }
});
