import Fetcher from "../tools/Fetcher";
import Post from "../types/Post";
import Thread from "../types/Thread";

export const getAllPosts = async (): Promise<Post[]> => {
    return Fetcher.get("/threads");
};

export const getPost = async (postId: string): Promise<Post> => {
    return Fetcher.retrieve("/posts", postId);
};

export const createPost = async (
    postInfo: { content: string; parent: Post | null },
    authToken: string
) => {
    return Fetcher.post("/posts", postInfo, authToken);
};


