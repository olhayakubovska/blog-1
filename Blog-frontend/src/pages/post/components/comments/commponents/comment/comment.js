import React from "react";
import styled from "styled-components";
import { Icon } from "../../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { removeCommentAsync } from "../../../../../../actions/remove-comment-async";
import { onOpenModal } from "../../../../../../actions/on-open-modal";
import { CLOSE_MODAL } from "../../../../../../actions/action-close-modal";
import { ROLE } from "../../../../../../constants";
import { selectUserRole } from "../../../../../../selects";
// import PropTypes from "prop-types";

const CommentContainer = ({
  className,
  publishedAt,
  content,
  author,
  id: commentId,
  postId,
}) => {
  const dispatch = useDispatch();
  // const requestServer = useServerRequest();
  const roleId = useSelector(selectUserRole);

  const onRemoveComment = (commentId) => {
    dispatch(
      onOpenModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(postId, commentId));
          dispatch(CLOSE_MODAL);
        },

        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(roleId);
  // console.log(publishedAt, content, author, commentId, postId, "FRONTEND");
  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon inActive={true} id="fa-user-circle-o" size="24px" />
            {author}
          </div>
          <div className="published-at">
            <Icon inActive={true} id="fa-calendar" size="24px" />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      {isAdminOrModerator && (
        <Icon
          id="fa-trash-o"
          size="24px"
          onClick={() => onRemoveComment(commentId)}
        />
      )}{" "}
    </div>
  );
};

export const Comment = styled(CommentContainer)`

display:flex;
align-items: baseline;

& .comment{
border: 1px solid black;
margin:5px;
}

& .information-panel {
display: flex;
justify-content: space-between;
margin: 8px;
}      

& .author {
display: flex;
font-size:18px;
gap:5px;

}

& .published-at {
display: flex;
 align-items: center;
gap: 5px;
}


& .comment-text{
margin: 5px 9px;
font-size:18px;
width: 560px;
}}

}
`;

// Comment.propTypes = {
//   id: PropTypes.number.isRequired,
//   author: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   publishedAt: PropTypes.string.isRequired,
//   postId: PropTypes.string.isRequired,
// };
