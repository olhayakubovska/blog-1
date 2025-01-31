import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { onOpenModal } from "../../../../actions/on-open-modal";
import { CLOSE_MODAL } from "../../../../actions/action-close-modal";
import { removePostAsync } from "../../../../actions/remove-post-async";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../../../../utils/check-access";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selects";
import PropTypes from 'prop-types'

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleId = useSelector(selectUserRole);

  const onPostRemove = (id) => {
    dispatch(
      onOpenModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(id)).then(() => {
            navigate("/");
          });
          dispatch(CLOSE_MODAL);
        },

        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <div className="special-panel">
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

        {isAdmin && (
          <div className="buttons">
            {editButton}
            {publishedAt && (
              <Icon
                id="fa-trash-o"
                margin="0 0 0 7px"
                size="18px"
                onClick={() => onPostRemove(id)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  margin: ${({ margin }) => margin};

  & .published-at {
    display: flex;
    font-size: 18px;
  }

  & .buttons {
    display: flex;
    gap: 5px;
  }

  & .special-panel {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 18px;
    justify-content: space-between;
  }
`;


SpecialPanel.propTypes = {
  id: PropTypes.string.isRequired,

  publishedAt: PropTypes.string.isRequired,
  editButton: PropTypes.node.isRequired,
};
