import Fetcher from "../tools/Fetcher";

export const getThread = async (threadId: string) => {
    return Fetcher.retrieve(`/threads`, threadId);
};

export const getAllThreads = async () => {
    return Fetcher.get("/threads")
}