export default function SampleBlogData(params) {
  return ({
    id: params.id,
    authorId: params.authorId,
    name: "blog" + params.id,
    posts: []
  });
}
