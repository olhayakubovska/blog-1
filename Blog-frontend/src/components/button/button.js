import styled from "styled-components";
import PropTypes from 'prop-types'

const ButtonContainer = ({ children, className, onClick, ...props }) => {
  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export const Button = styled(ButtonContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: ${({ width = "100%" }) => width};
  height: 32px;
  border: 1px solid #000;
  background-color: #eee;

  &:hover {
    cursor: pointer;
  }
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  // onClick: PropTypes.func.isRequired, // Исправлено
  width: PropTypes.string, // Если вы хотите указать prop width, лучше добавить и его
};