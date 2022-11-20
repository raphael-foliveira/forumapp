import Fetcher from "../tools/Fetcher";
import SubForum from "../types/SubForum";

export const getAllSubForums = async (): Promise<SubForum[]> => {
    return Fetcher.get("/subforums");
};

export const getSubForum = async (subName: string): Promise<SubForum> => {
    return Fetcher.get(`/subforums/${subName}`);
};

export const createSubForum = async (newSubData: FormData, authToken: string): Promise<SubForum | void> => {
    return Fetcher.postFormData("/subforums", newSubData, authToken);
};
