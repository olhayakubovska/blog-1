import styled from "styled-components";
import { Button } from "../button/button";
import { useSelector } from "react-redux";
import {
  selectModalOnCancel,
  selectModalOnConfirm,
  selectModalText,
  selectModalIsOpen,
} from "../../selects";

const ModalContainer = ({ className }) => {
  const text = useSelector(selectModalText);
  const isOpen = useSelector(selectModalIsOpen);
  const onConfirm = useSelector(selectModalOnConfirm);
  const onCancel = useSelector(selectModalOnCancel);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className}>
      <div className="overlay"></div>
      <div className="box">
        <h3>{text}</h3>
        <div className="buttons">
          <Button width="120px" onClick={onConfirm}>
            ДА
          </Button>
          <Button width="120px" onClick={onCancel}>
            ОТМЕНА
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Modal = styled(ModalContainer)`
  position: fixed;
  z-index: 20;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;

  & .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
  }

  & .box {
  text-align:center;
    width: 400px;
    margin: 0 auto;
    z-index: 30;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
    background-color: white;
    border: 1px solid black;
    padding: 0 20px 10px;
  }

  & .buttons {
    display: flex;
    justify-content: center;
  }
  & .buttons button {
    margin: 0 5px;
  }
`;
