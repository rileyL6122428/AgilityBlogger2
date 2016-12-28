import BlogList from '../../../../src/submodules/blogger/classes/blog/BlogList.js';

describe("BlogList", () => {
  let blogList, storedBlog1, storedBlog2;

  beforeEach(() => {
    storedBlog1 = { name: "storedBlog1" };
    storedBlog2 = { name: "storedBlog2" };

    blogList = new BlogList([storedBlog1, storedBlog2]);
  });

  xit("should instantiate with a list of stored blogs", () => {

  });
});
