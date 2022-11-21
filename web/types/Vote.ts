import Post from "./Post";
import User from "./User";

type Vote = {
    id: string;
    post: Post;
    user: User;
    value: 1 | -1
};

export default Vote;
