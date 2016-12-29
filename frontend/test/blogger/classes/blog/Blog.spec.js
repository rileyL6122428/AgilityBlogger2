import Blog from '../../../../src/submodules/blogger/classes/blog/Blog.js';
import SampleBlogData from '../../utils/dataFactories/BlogDataFactory.js';

describe("Blog", () => {
  let blog, blogData;

  beforeEach(() => {
    blogData = SampleBlogData({ id: 1, authorId: 1 });
    blog = new Blog(blogData);
  });

  it("should instantiate with a name", () => {
    expect(blog.getName()).toEqual(blogData.name);
  });
});

//NOTE RAW BLOG FORMAT => {"id":1,"author":{"id":1},"name":"blog1","posts":[]}
