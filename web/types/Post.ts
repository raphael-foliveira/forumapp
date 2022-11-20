import User from "./User";

type Post = {
    id: string;
    author: User;
    content: string;
    parent: Post;
    children: Post[];
    createdAt: string;
};

export default Post;
