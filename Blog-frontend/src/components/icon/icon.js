import styled from "styled-components";
import PropTypes from "prop-types";

const IconContainer = ({ className, id, onClick, inActive, ...props }) => (
  <div className={className} onClick={onClick} {...props}>
    <i className={`fa ${id}`} aria-hidden="true"></i>
  </div>
);

export const Icon = styled(IconContainer)`
  font-size: ${({ size }) => size};
  margin: ${({ margin }) => margin};
  color: ${({ disabled }) => (disabled ? "#ccc" : "#000")};

  &:hover {
    cursor: ${({ inActive }) => (inActive ? "default" : "pointer")};
  }
`;

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  inActive: PropTypes.bool,
};
