import Thread from "./Thread";

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    posts: Thread[];
    friends: User[];
};

export default User;
