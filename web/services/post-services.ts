import Fetcher from "../tools/fetcher";
import Post from "../types/Post";

export const getAllPosts = async (): Promise<Post[]> => {
    return Fetcher.get("/posts");
};

export const getAllThreads = async (): Promise<Post[]> => {
    return Fetcher.get("/threads");
};

export const getPost = async (postId: string): Promise<Post> => {
    return Fetcher.retrieve("/posts", postId);
};
