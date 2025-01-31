import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PostCard } from "./components/post-card/post-card";
import { Pagination } from "./components/pagination/pagination";
import { PAGINATION_LIMIT } from "../../constants";
// import { getLastPageFromLinks } from "./utils";
import { Search } from "./search/search";
import { debounce } from "./utils/debounce";
import { request } from "../../utils";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldPhrase, setShouldPhrase] = useState(false);

  // const requestServer = useServerRequest();

  const startDelaySearch = useMemo(() => debounce(setShouldPhrase, 2000), []);

  useEffect(() => {
    request(
      `posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { posts, lastPage } }) => {
      setPosts(posts);
      setLastPage(lastPage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, page, shouldPhrase]);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelaySearch(!shouldPhrase);
  };
  return (
    <div className={className}>
      <div className="posts-and-search">
        <Search onChange={onSearch} searchPhrase={searchPhrase} />

        {posts.length > 0 ? (
          <div className="post-list">
            {posts.map(({ id, imageUrl, title, publishedAt, comments }) => (
              <PostCard
                key={id}
                id={id}
                imageUrl={imageUrl}
                title={title}
                publishedAt={publishedAt}
                commentsCount={comments.length}
              />
            ))}
          </div>
        ) : (
          <div>Статьи не найдено</div>
        )}
      </div>
      {lastPage > 1 && posts.length > 0 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .post-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 80px;
  }
`;

// {lastPage > 1 && (
//   <Pagination page={page} lastPage={lastPage} setPage={setPage} />
// )}
