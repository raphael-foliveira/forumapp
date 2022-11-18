import Post from "./Post";
import Thread from "./Thread";

type Comment = {
    id: string;
    thread: Thread;
    post: Post;
};

export default Comment;
