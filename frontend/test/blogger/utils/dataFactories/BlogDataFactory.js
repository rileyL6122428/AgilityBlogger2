export default function SampleBlogData(params) {
  return ({
    id: params.id,
    author: { id: params.authorId },
    name: "blog" + params.id,
    posts: []
  });
}
