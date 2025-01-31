import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Error, Header, Footer, Modal } from "./components";
import { Authorization, Main, Registration } from "./pages";
import { Users } from "./pages/users/users";
import { Post } from "./pages/post/post";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions/set-user";
import { ERROR } from "./constants";

const AppColum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;

  position: relative;
`;

const Page = styled.div`
  padding: 120px 0 20px;
`;

const Blog = () => {
  const dispatch = useDispatch();
  // При загрузке страницы проверяем, есть ли данные в sessionStorage

  useLayoutEffect(() => {
    const currentuserDataJSON = sessionStorage.getItem("userData");
    if (!currentuserDataJSON) {
      return;
    }

    const currentuserData = JSON.parse(currentuserDataJSON);

    dispatch(
      setUser({ ...currentuserData, roleId: Number(currentuserData.roleId) }) // Восстановление состояния в Redux store
    );
  }, [dispatch]);


  return (
    <AppColum>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/:id/edit" element={<Post />} />
          <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
        </Routes>
      </Page>
      <Footer />
      <Modal />
    </AppColum>
  );
};

export default Blog;
