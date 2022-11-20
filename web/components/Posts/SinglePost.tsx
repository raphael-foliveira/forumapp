"use client";
import {
    Card,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPost } from "../../services/post-services";
import { parseDate } from "../../tools/parseDate";
import Post from "../../types/Post";
import CreateCommentForm from "../Comments/Forms/CreateCommentForm";

export default function SinglePost({ post, showComments }: { post: Post; showComments: boolean }) {
    const [allComments, setAllComments] = useState<Post[]>([]);

    const handleSubmitComment = (newComment: Post) => {
        setAllComments((prevComments) => [...prevComments, newComment]);
    };

    const fetchPostsWithRelations = async () => {
        const allChildPosts = [];
        if (!post.children) {
            return;
        }
        for (let child of post.children) {
            const postWithRelations = await getPost(child.id);
            allChildPosts.push(postWithRelations);
        }
        setAllComments(allChildPosts);
    };

    useEffect(() => {
        fetchPostsWithRelations();
    }, []);

    return (
        <>
            <Text>{post.content}</Text>
            <Text marginTop={"10px"} fontSize="sm">
                <em>
                    created at {parseDate(post.createdAt)} by {post.author.username}
                </em>
            </Text>
            <CreateCommentForm parent={post} handleSubmitComment={handleSubmitComment} />
            {allComments.length > 0 && (
                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <Text>
                                {" "}
                                <em>
                                    {" "}
                                    {allComments.length > 1
                                        ? allComments.length + " comments"
                                        : "1 comment"}
                                </em>
                            </Text>
                        </AccordionButton>
                        <AccordionPanel>
                            {allComments.map((comment) => {
                                return (
                                    <Box key={comment.id} margin={"20px"} padding="10px">
                                        <SinglePost post={comment} showComments={false} />
                                    </Box>
                                );
                            })}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            )}
        </>
    );
}
