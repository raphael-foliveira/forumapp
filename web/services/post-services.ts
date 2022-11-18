import Fetcher from "../tools/Fetcher";
import Thread from "../types/Thread";

export const getAllPosts = async (): Promise<Thread[]> => {
    return Fetcher.get("/threads");
};

export const getPost = async (threadId: string): Promise<Thread> => {
    return Fetcher.retrieve("/threads", threadId);
};
