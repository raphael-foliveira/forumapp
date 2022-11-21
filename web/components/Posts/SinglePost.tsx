"use client";
import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPost } from "../../services/post-services";
import { parseDate } from "../../tools/parseDate";
import Post from "../../types/Post";
import CreateCommentForm from "../Comments/Forms/CreateCommentForm";
import VoteControls from "./VoteControls/VoteControls";

export default function SinglePost({ post }: { post: Post }) {
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
            <Flex justifyContent={"space-between"}>
                <Box>
                    <Text>{post.content}</Text>
                    <Text marginTop={"10px"} fontSize="sm">
                        <em>
                            created at {parseDate(post.createdAt)} by {post.author.username}
                        </em>
                    </Text>
                </Box>
                <VoteControls post={post} />
            </Flex>
            <CreateCommentForm parent={post} handleSubmitComment={handleSubmitComment} />
            {allComments.length > 0 && (
                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <Text>
                                <em>
                                    {allComments.length > 1
                                        ? allComments.length + " comments"
                                        : "1 comment"}
                                </em>
                            </Text>
                        </AccordionButton>
                        <AccordionPanel>
                            {allComments.map((comment) => {
                                return (
                                    <Box key={comment.id} padding="10px 0">
                                        <SinglePost post={comment} />
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
