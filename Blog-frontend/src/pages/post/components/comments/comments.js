import React, { useState } from "react";
import styled from "styled-components";
import { Comment } from "./commponents";
import { Icon } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../../../selects";
import { addCommentAsync } from "../../../../actions/add-comment-async";
// import { PROP_TYPES, ROLE } from "../../../../constants";

// import PropTypes from "prop-types";

const CommentsContainer = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const roleId = useSelector(selectUserRole);

  const dispatch = useDispatch();

  const onNewCommentAdd = (postId, content) => {
    dispatch(addCommentAsync(postId, content));
    setNewComment("");
  };
  // console.log(comments, "comments");
  // const isGuest = roleId === ROLE.GUEST;

  return (
    <div className={className}>
      {!roleId === 0 && (
        <>
          <div className="new-comment">
            <textarea
              name="comment"
              value={newComment}
              placeholder="Коментарий..."
              onChange={({ target }) => setNewComment(target.value)}
            ></textarea>
            <Icon
              id="fa-paper-plane-o"
              // margin="0 0 0 10px"
              size="21px"
              onClick={() => onNewCommentAdd(postId, newComment)}
            />
          </div>
        </>
      )}
      <div className="comments">
        {comments.map(({ publishedAt, content, author, id }) => (
          <Comment
            key={id}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    
    
    & .new-comment textarea {
      width: 580px;
    height: 120px;
    margin: 20px 0 0;
    resize: none;
          font-size: 18px;
          margin: 20px 9px 0;
а
  }

  & .new-comment {
    display: flex;
        align-items: baseline;

  }
`;

// Comments.propTypes = {
//   comments: PropTypes.arrayOf(PROP_TYPES.COMMENT).isRequired,
//   postId: PropTypes.string.isRequired,
// };
