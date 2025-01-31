export const mapComment = (comment) => {
  return {
    content: comment.content,
    id: comment.id,
    author: comment.author.login,
    publishedAt: comment.createdAt,
  };

};
