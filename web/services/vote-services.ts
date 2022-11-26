import Fetcher from "../tools/Fetcher";

export const upsertVote = async (
    postId: string,
    userId: string,
    value: 1 | -1,
    authToken: string
) => {
    return Fetcher.put(`/votes?userId=${userId}&postId=${postId}`, { value }, authToken);
};

export const deleteVote = async (postId: string, userId: string, authToken: string) => {
    return Fetcher.delete(`/votes?userId=${userId}&postId=${postId}`, authToken);
};

export const getPostVotes = async (postId: string) => {
    return Fetcher.get(`/votes?postId=${postId}`);
};
