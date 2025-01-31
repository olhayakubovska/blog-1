import styled from "styled-components";
import { Content, H2 } from "../../components";
import { UserRow } from "./components/user-row/user-row";
import { TableRow } from "./components/table-row/table-row";
import { useEffect, useState } from "react";
import { ROLE } from "../../constants";
import { checkAccess } from "../../utils/check-access";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selects";
import { request } from "../../utils";

const UsersContainer = ({ className }) => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  // const requestServer = useServerRequest();
  const [flag, setFlag] = useState(false);

  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    Promise.all([request("/users"), request("users/roles")]).then(
      ([userRes, rolesRes]) => {
        if (userRes.error || rolesRes.error) {
          setErrorMessage(userRes.error || rolesRes.error);
          return;
        }
        setRoles(rolesRes.data);
        setUsers(userRes.data);
      }
    );
  }, [flag, userRole]);

  const removeUser = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    request(`users/${userId}`, "DELETE").then(() => {
      setFlag(!flag);
    });
  };

  return (
    <Content error={errorMessage} access={[ROLE.ADMIN]}>
      <div className={className}>
        <H2>Пользователи</H2>
        <div>
          <TableRow>
            <div className="login-column">Логин</div>
            <div className="registered-at-column">Дата регестрации</div>
            <div className="role-column">Роль</div>
          </TableRow>
          {users.map(({ id, login, roleId }) => (
            <UserRow
              key={id}
              id={id}
              // registeredAt={registeredAt}
              login={login}
              roleId={roleId}
              roles={roles.filter(({ name }) => name !== "Гость")}
              removeUser={() => removeUser(id)}
            />
          ))}
        </div>
      </div>
    </Content>
  );
};

export const Users = styled(UsersContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 570px;
  margin: 0 auto;
  font-size: 18px;
`;
