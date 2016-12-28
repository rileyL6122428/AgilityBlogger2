import BlogList from '../../../../src/submodules/blogger/classes/blog/BlogList.js';
import Blog from '../../../../src/submodules/blogger/classes/blog/Blog.js';

describe("BlogList", () => {
  let blogList, blog1, blog2;

  beforeEach(() => {
    blog1 = new Blog({ name: "blog1" });
    blog2 = new Blog({ name: "blog2" });

    blogList = new BlogList([blog1, blog2]);
  });

  it("should instantiate with a list of stored blogs", () => {
    expect(blogList.getBlogs()).toEqual([blog1, blog2]);
  });
});
