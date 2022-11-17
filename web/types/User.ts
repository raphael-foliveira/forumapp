import Post from "./Post";

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    posts: Post[];
    friends: User[];
};

export default User;
