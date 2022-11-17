import SubForum from "./SubForum";
import User from "./User";

type Post = {
    id: string;
    title: string;
    content: string;
    image: string;
    author: User;
    subForum: SubForum;
    comments: Post[];
};

export default Post;
