import FilterableBlogList from '../../../../src/submodules/blogger/classes/blog/FilterableBlogList.js';

describe("FilterableBlogList", () => {
  let blogList, storedBlog1, storedBlog2;

  beforeEach(() => {
    storedBlog1 = { name: "storedBlog1" };
    storedBlog2 = { name: "storedBlog2" };

    blogList = new FilterableBlogList([storedBlog1, storedBlog2]);
  });

  xit("should instantiate with a list of stored Blogs", () => {

  });

});
