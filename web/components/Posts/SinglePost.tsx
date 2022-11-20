"use client";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPost } from "../../services/post-services";
import Post from "../../types/Post";

export default function SinglePost({ postId }: { postId: string }) {
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        getPost(postId).then((postInfo) => {
            setPost(postInfo);
        });
    }, []);

    return (
        <>
            {post && (
                <>
                    
                </>
            )}
        </>
    );
}
