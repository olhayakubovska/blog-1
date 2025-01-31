import styled from "styled-components";
import { Logo } from "./components";
import { ControlPanel } from "./components";

const HeadeContainerr = ({ className }) => (
  <header className={className}>
    <Logo />
    <Description>
      Веб-технологии
      <br />
      Написание кода
      <br />
      Разбор ошибок
    </Description>
    <ControlPanel />
  </header>
);

export const Header = styled(HeadeContainerr)`
  justify-content: space-between;
  display: flex;
  position: fixed;
  top: 0;
  height: 120px;
  width: 1000px;
  padding: 20px 40px;
  box-shadow: 0 -2px 15px #000;
  background-color: #fff;
`;

const Description = styled.div`
  font-style: italic;
`;
