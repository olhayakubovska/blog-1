import styled from "styled-components";
import { Icon } from "../../../../components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PostCardContainer = ({
  className,
  id,
  imageUrl,
  title,
  publishedAt,
  commentsCount,
}) => {
  return (
    <div className={className}>
      <Link to={`/posts/${id}`}>
        <img src={imageUrl} alt={title} />
        <div className="post-card-footer">
          <h4>{title}</h4>
          <div className="post-card-info">
            <div className="published-at">
              {publishedAt && (
                <Icon
                  inActive={true}
                  id="fa-calendar"
                  margin="0 7px 0 0"
                  size="18px"
                />
              )}
              {publishedAt}
            </div>
            <div className="comments-count">
              <Icon
                inActive={true}
                id="fa-comment-o"
                margin="0 10px 0 0"
                size="18px"
              />
              {commentsCount}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PostCard = styled(PostCardContainer)`
  width: 280px;

  margin: 20px;
  justify-content: space-between;

  & .post-card-footer {
    border: 1px solid #000;
  }

  & img {
    display: block;
  }

  & h4 {
    margin: 5px;
  }

  & .post-card-info {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }

  & .comments-count {
    display: flex;
  }

  & .published-at {
    display: flex;
  }
`;

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
};
