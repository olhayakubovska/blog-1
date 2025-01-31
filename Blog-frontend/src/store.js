import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import {
  userReducer,
  usersReducer,
  postReducer,
  postsReducer,
  appReducer,
} from "./reducers";

// const composeEnhangers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  users: usersReducer,
  post: postReducer,
  posts: postsReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
