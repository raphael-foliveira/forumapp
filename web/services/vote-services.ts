import Fetcher from "../tools/Fetcher";

export const upsertVote = async (
    postId: string,
    userId: string,
    value: 1 | -1,
    authToken: string
) => {
    return Fetcher.put(`/posts/${postId}/votes/${userId}`, { value }, authToken);
};

export const deleteVote = async (postId: string, userId: string, authToken: string) => {
    return Fetcher.delete(`/posts/${postId}/votes/${userId}`, authToken);
};
