import React from "react";
import styled from "styled-components";
import { H2, Icon } from "../../../../components";
import { SpecialPanel } from "../special-pane/special-panel";
import { useNavigate } from "react-router-dom";
import { PROP_TYPES } from "../../../../constants";

const PostContentCcontainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <img src={imageUrl} alt={title} />
      <H2>{title}</H2>
      <SpecialPanel
        id={id}
        publishedAt={publishedAt}
        margin="-20px 0 20px"
        editButton={
          <Icon
            id="fa-pencil-square-o"
            size="18px"
            onClick={() => navigate(`/posts/${id}/edit`)}
          />
        }
      />

      <div className="post-text">{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContentCcontainer)`
  & img {
    float: left; /* Обтекание изображения слева */
    margin: 0 20px 10px 0; /* Отступы: сверху 0, справа 20px, снизу 10px, слева 0 */
  }

  & .post-text {
    font-size: 18px; /* Размер шрифта */
    white-space: pre-line; /* Сохранение пробелов и переносов строк, как в исходном тексте */
  }
`;

PostContent.propTypes = {
  post: PROP_TYPES.POST.isRequired,
};
