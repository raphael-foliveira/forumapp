import User from "./User";
import Vote from "./Vote";

type Post = {
    id: string;
    author: User;
    content: string;
    parent: Post;
    children: Post[];
    createdAt: string;
    votes: Vote[];
};

export default Post;
