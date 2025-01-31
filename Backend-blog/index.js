import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {
  deleteUser,
  getRoles,
  getUsers,
  loginFn,
  register,
  updateUser,
} from "./controllers/user.js";
import { mapUser } from "./helpers/mapUser.js";
import { authenticated } from "./middlewares/authenticated.js";
import { hasRole } from "./middlewares/hasRole.js";
import { USER_ROLE } from "./constants.js";
import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
} from "./controllers/post.js";
import { mapPost } from "./helpers/mapPost.js";
import { addComment, deleteComment } from "./controllers/comment.js";
import { mapComment } from "./helpers/mapComment.js";

const app = express();
const port = 3001;

app.use(express.static("../Blog-practice/build"));

app.use(cookieParser());
app.use(express.json());


app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);


    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });

  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await loginFn(req.body.login, req.body.password);
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
    })
    .send({});
});

app.get("/posts", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

app.get("/posts/:id", async (req, res) => {
  const post = await getPost(req.params.id);
  res.send({ data: mapPost(post) });
});

app.use(authenticated);

app.post("/posts/:id/comments", async (req, res) => {


  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });
  res.send({ data: mapComment(newComment) });
});

app.delete(
  "/posts/:postId/comments/:commentId",
  hasRole([USER_ROLE.USER, USER_ROLE.ADMIN]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);
    res.send({ error: null });
  }
);

app.post(
  "/posts",
  hasRole([USER_ROLE.USER, USER_ROLE.ADMIN]),
  async (req, res) => {
    const addedPost = await addPost(req.body);
    res.send({ data: mapPost(addedPost) });
  }
);

app.post("/posts", hasRole([USER_ROLE.USER]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });
  res.send({ data: mapPost(newPost) });
});

app.patch(
  "/posts/:id",
  hasRole([USER_ROLE.ADMIN, USER_ROLE.USER]),
  async (req, res) => {
    const editedPost = await editPost(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    });
    res.send({ data: mapPost(editedPost) });
  }
);

app.delete("/posts/:id", async (req, res) => {
  await deletePost(req.params.id);

  res.send({ error: null });
});

app.get("/users", hasRole([USER_ROLE.ADMIN]), async (req, res) => {
  const users = await getUsers();
  res.send({ data: users.map(mapUser) });
});

app.get("/users/roles", hasRole([USER_ROLE.ADMIN]), (req, res) => {
  const roles = getRoles();
  res.send({ data: roles });
});

app.patch("/users/:id", hasRole([USER_ROLE.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });
  res.send({ data: mapUser(newUser) });
});

app.delete("/users/:id", hasRole([USER_ROLE.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);
  res.send({ error: null });
});

mongoose
  .connect(
    "mongodb+srv://oyakubovska:qwerty123@cluster0.abt5c.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}...`);
    });
  });
