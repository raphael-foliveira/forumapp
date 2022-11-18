import User from "./User";

type Post = {
    id: string;
    author: User;
    parent: Post;
    children: Post[];
    createdAt: Date;
};

export default Post;
