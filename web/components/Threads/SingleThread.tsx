"use client";
import { Text, Image, Button } from "@chakra-ui/react";
import Post from "../../types/Post";
import Thread from "../../types/Thread";

export default function SingleThread({ thread, post }: { thread: Thread; post: Post }) {
    return (
        <>
            <Text as="h1" fontWeight={"bold"} fontSize="2xl">
                {thread.title}
            </Text>
            <Image
                src={process.env.NEXT_PUBLIC_API_URL + "/" + thread.image}
                maxW="800px"
                h={"auto"}
            />
            <Text>{post.content}</Text>
            <Button>Add Comment</Button>
        </>
    );
}
