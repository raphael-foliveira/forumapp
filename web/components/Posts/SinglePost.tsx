"use client";
import Thread from "../../types/Thread";
import { Text, Image, Card } from "@chakra-ui/react";
import PostCard from "./PostCard";
import { getPost } from "../../services/post-services";
import { use } from "react";

export default function SinglePost({ postId }: { postId: string }) {
    const post = use<Thread>(getPost(postId));

    return (
        <>
            <Card>
                <Text as="h1" fontSize={"lg"}>
                    {post.title}
                </Text>
                {post.image && <Image src={post.image} />}
                <Text as="p">{post.content}</Text>
                <Text as="p">by {post.author?.username || ""}</Text>
            </Card>
            {post.comments.map((comment: Thread) => {
                return <PostCard post={comment} />;
            })}
        </>
    );
}
