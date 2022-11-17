"use client";
import Post from "../../types/Post";
import { Text, Image, Card } from "@chakra-ui/react";
import PostCard from "./PostCard";
import { getPost } from "../../services/post-services";
import { use } from "react";

export default function SinglePost({ postId }: { postId: string }) {
    const post = use<Post>(getPost(postId));

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
            {post.comments.map((comment: Post) => {
                return <PostCard post={comment} />;
            })}
        </>
    );
}
