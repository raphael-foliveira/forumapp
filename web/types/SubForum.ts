import User from "./User";
import Thread from "./Thread";

type SubForum = {
    id: string;
    name: string;
    description: string;
    admin: User;
    posts: Thread[];
    createdAt: string;
    members: User[];
    image: string;
};

export default SubForum;
