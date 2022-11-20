import { Text, Card, Image, Box, Flex } from "@chakra-ui/react";
import { use, useEffect, useState } from "react";
import { getPost } from "../../services/post-services";
import { getThread } from "../../services/thread-services";
import { parseDate } from "../../tools/parseDate";
import Post from "../../types/Post";
import Thread from "../../types/Thread";
import SinglePost from "../Posts/SinglePost";

export default function ThreadCard({ threadId }: { threadId: string }) {
    const [thread, setThread] = useState<Thread>();
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        getThread(threadId).then((threadInfo: Thread) => {
            setThread(threadInfo);
            getPost(threadInfo.post.id).then((postInfo: Post) => {
                setPost(postInfo);
            });
        });
    }, []);

    return (
        <>
            {thread && post && (
                <Card padding={5} shadow="1px 1px 10px" margin="20px 0">
                    <Flex>
                        <Box margin="20px 0" width={"80%"}>
                            <Text as="h3" fontWeight={"bold"}>
                                {thread.title}
                            </Text>
                            <Text as="p">{post.content}</Text>
                            {thread.image && (
                                <Image
                                    w="200px"
                                    h="auto"
                                    src={process.env.NEXT_PUBLIC_API_URL + "/" + thread.image}
                                />
                            )}
                        </Box>
                        <Box>
                            <Text>Created at: {parseDate(post.createdAt)}</Text>
                            <Text>by: {post.author?.username}</Text>
                            <Text>{post.children.length} comments</Text>
                        </Box>
                    </Flex>
                </Card>
            )}
        </>
    );
}
