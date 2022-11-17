import User from "./User";
import Post from "./Post";

type SubForum = {
    id: string;
    name: string;
    description: string;
    admin: User;
    posts: Post[];
    createdAt: Date;
    members: User[];
};

export default SubForum;
