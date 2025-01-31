import styled from "styled-components";
import { Icon } from "../../../icon/icon";
import { Link } from "react-router-dom";
// const IconContainer = ({ className }) => (
//   <div className={className}>
//     <i className="fa fa-code" aria-hidden="true"></i>
//   </div>
// );

// const Icon = styled(IconContainer)`
//   font-size: 70px;
//   margin-right: 10px;
// `;

const LargeText = styled.div`
  font-size: 48px;
  line-height: 48px;
  margin-top: 17px;
  font-weight: 600;
`;
const SmallText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const LogoContainer = ({ className }) => (
  <Link to="/" className={className}>
    <Icon id="fa-code" size="70px" margin="0 10px 0 0" />

    <div>
      <LargeText>Блог</LargeText>
      <SmallText>Веб-разработчика</SmallText>
    </div>
  </Link>
);

export const Logo = styled(LogoContainer)`
  display: flex;
  margit-top: -21px;

`;
