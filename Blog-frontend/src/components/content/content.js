import { useSelector } from "react-redux";
import { Error } from "../error/error";
import { selectUserRole } from "../../selects";
import { ERROR, PROP_TYPES } from "../../constants";
import { checkAccess } from "../../utils/check-access";
import PropTypes from "prop-types";

export const Content = ({ children, serverError = null, access }) => {
  const userRole = useSelector(selectUserRole);

  const acessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIDE;
  const error = acessError || serverError;

  return error ? <Error error={error} /> : children;
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  access: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  serverError: PROP_TYPES.ERROR,
};
