import angular from 'angular';
import 'angular-mocks';
import bloggerModule from '../../../src/submodules/blogger/bloggerModule.js';
import Blog from '../../../src/submodules/blogger/classes/blog/Blog.js';
import SampleBlogData from '../utils/dataFactories/BlogDataFactory.js';

const {inject, module} = angular.mock;

describe("blogStore", () => {

  let blogStore;
  let rawBlog1, rawBlog2, rawBlog3;

  beforeEach(module(bloggerModule));

  beforeEach(inject((_blogStore_) => {
    blogStore = _blogStore_;
  }));

  beforeEach(() => {
    rawBlog1 = SampleBlogData({ id: 1, authorId: 1 });
    rawBlog2 = SampleBlogData({ id: 2, authorId: 1 });
    rawBlog3 = SampleBlogData({ id: 3, authorId: 1 });
  });

  it("should be wired into the module", () => {
    expect(blogStore).toBeDefined();
  });

  it("should store blog data as instances of the Blog class", () => {
    blogStore.depositBlogs([rawBlog1]);

    let storedBlog = blogStore.getBlog(rawBlog1.id);
    expect(storedBlog instanceof Blog).toBe(true);
  });

  describe("#getBlog", () => {
    beforeEach(() => blogStore.depositBlogs([rawBlog1]));

    it("should return a blog when a blog of the provided id is stored", () => {
      let retrievedBlog = blogStore.getBlog(rawBlog1.id);
      expect(retrievedBlog.getId()).toEqual(rawBlog1.id)
      expect(retrievedBlog.getName()).toEqual(rawBlog1.name)
    });

    it("should return null when a blog of the provided id is not stored", () => {
      let retrievedBlog = blogStore.getBlog(9001);
      expect(retrievedBlog).toEqual(null);
    });
  });

  describe("#getUserBlogs", () => {
    beforeEach(() => blogStore.depositBlogs([rawBlog1, rawBlog2, rawBlog3]));

    it("should return a list of blogs when blogs with the provided author id are present", () => {
      let retrievedBlogs = blogStore.getBlogs(rawBlog1.author.id);
      expect(retrievedBlogs.length).toEqual(3);
      retrievedBlogs.forEach((blog) => {
        expect(blog.authorId).toEqual(rawBlog1.author.id)
      })
    });
    
    it("should return an empty list when there are no blogs with the corresponding author id present", () => {
      let retrievedBlogs = blogStore.getBlogs(9001);
      expect(retrievedBlogs).toEqual([]);
    });
  });
});
