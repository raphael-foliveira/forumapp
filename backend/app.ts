import express, { json } from "express";
import corsHandler from "./middleware/cors.middleware";
import { dataSource } from "./db/data-source";
import usersRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import subForumRouter from "./routes/subforum.routes";
import authRouter from "./routes/auth.routes";

dataSource.initialize().then(() => {
    console.log("db started");
});

const app = express();

app.use(json());
app.use(corsHandler);
app.use("/users", usersRouter);
app.use("/posts", postRouter);
app.use("/subforums", subForumRouter);
app.use("/auth", authRouter)

app.listen(5173, () => {
    console.log("Running on port 5173");
});
