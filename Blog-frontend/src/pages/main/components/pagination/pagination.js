import styled from "styled-components";
import { Button } from "../../../../components";

import PropTypes from "prop-types";

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
  return (
    <div className={className}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Педыдущая
      </Button>
      <div className="current-page">Страница: {page}</div>
      <Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Следущая
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(1)}>
        В конец
      </Button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  margin: 0 0 20px;
  padding: 0 35px;
  justify-content: center;

  position: absolute;
  bottom: 140px;
  width: 100%;

  & button {
    margin: 0 5px;
  }

  & .current-page {
    font-weight: 500;
    width: 100%;
    height: 32px;
    font-size: 18px;
    text-align: center;
    border: 1px solid #000;
  }
`;

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
