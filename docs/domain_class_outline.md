User
  username; string -> required, length in (5..35), no spaces or dashes in name
  password(for now, later use spring security to handle this); string -> required, length in (5..35)
  Has Many
    blogs
    posts
    comments

Blog
  title; string -> required
  dateCreated
  Has many
    posts
    comments
  Belongs to
    author (must exist)

Post
  title; String -> required
  body; text -> required
  dateCreated
  Has many
    comments
  Belongs to
    blog (required)

Comment
  body; text -> required
  dateCreated
  Belongs to
    author (required)
    post (required)
