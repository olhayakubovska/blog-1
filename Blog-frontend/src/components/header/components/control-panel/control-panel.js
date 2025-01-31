import styled from "styled-components";
import { Icon } from "../../../icon/icon";
import { Button } from "../../../button/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserRole,
  selectUserLogin,
  
} from "../../../../selects";
import { ROLE } from "../../../../constants";
import { logout } from "../../../../actions/logout";
import { checkAccess } from "../../../../utils/check-access";

const RightAlied = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledBackIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const StyledLogoutIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

  return (
    <div className={className}>
      <RightAlied>
        {roleId === ROLE.GUEST ? (
          <Button>
            {" "}
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <StyledLogoutIcon>
              {" "}
              <Icon
                id="fa-sign-out"
                margin="0px 0 0 10px"
                size="24px"
                onClick={() => onLogout()}
              />
            </StyledLogoutIcon>
          </>
        )}
      </RightAlied>
      <RightAlied>
        <StyledBackIcon onClick={() => navigate(-1)}>
          <Icon id="fa-caret-left" margin="10px 0 0 0" size="24px" />
        </StyledBackIcon>

        {isAdmin && (
          <>
            <Link to="/posts">
              <Icon id="fa-file-text-o" margin="10px 0 0 16px" size="24px" />
            </Link>
            <Link to="/users">
              <Icon id="fa-users" margin="10px 0 0 16px" size="24px" />
            </Link>
          </>
        )}
      </RightAlied>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
