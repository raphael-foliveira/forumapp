import Post from "./Post";
import SubForum from "./SubForum";

type Thread = {
    id: string;
    title: string;
    post: Post;
    image: string;
    subForum: SubForum;
};

export default Thread;
