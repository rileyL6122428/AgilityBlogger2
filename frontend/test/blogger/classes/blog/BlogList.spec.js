import BlogList from '../../../../src/submodules/blogger/classes/blog/BlogList.js';
import SampleBlogData from '../../utils/dataFactories/BlogDataFactory.js';

describe("BlogList", () => {
  let blogList, blog1, blog2;

  beforeEach(() => {
    blog1 = SampleBlogData({ id: 1, authorId: 1 });
    blog2 = SampleBlogData({ id: 2, authorId: 1 });
    blogList = new BlogList([blog1, blog2]);
  });

  it("should instantiate with a list of stored blogs", () => {
    expect(blogList.getBlogs()).toEqual([blog1, blog2]);
  });
});
