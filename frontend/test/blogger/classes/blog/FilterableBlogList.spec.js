import FilterableBlogList from '../../../../src/submodules/blogger/classes/blog/FilterableBlogList.js';
import Blog from '../../../../src/submodules/blogger/classes/blog/Blog.js';

describe("FilterableBlogList", () => {
  let blogList, blog1, blog2;

  beforeEach(() => {
    blog1 = new Blog({ name: "blog1" });
    blog2 = new Blog({ name: "blog2" });

    blogList = new FilterableBlogList([blog1, blog2]);
  });

  it("should instantiate with a list of stored Blogs", () => {
    expect(blogList.getBlogs()).toEqual([blog1, blog2]);
  });

});
