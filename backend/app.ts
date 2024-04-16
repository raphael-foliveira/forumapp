import express, { json } from 'express';
import { dataSource } from './db/data-source';
import usersRouter from './routes/user.routes';
import threadRouter from './routes/thread.routes';
import subForumRouter from './routes/subforum.routes';
import authRouter from './routes/auth.routes';
import postRouter from './routes/post.routes';
import voteRouter from './routes/vote.routes';
import memberRouter from './routes/member.routes';
import { cors } from './middleware/cors.middleware';
import { errorHandlingMiddleware } from './middleware/error-handling.middleware';

const port = process.env.APP_PORT || 8000;

const app = express();

app.use(json());
app.use(cors);
app.use(express.static('./'));
app.use('/users', usersRouter);
app.use('/threads', threadRouter);
app.use('/subforums', subForumRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/votes', voteRouter);
app.use('/members', memberRouter);
app.use(errorHandlingMiddleware);

const run = async () => {
  await dataSource.initialize();

  console.log('Db Running');

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

run();
