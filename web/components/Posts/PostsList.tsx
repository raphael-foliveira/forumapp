import { use } from "react";
import PostCard from "./PostCard";
import Post from "../../types/Post";
import { getAllPosts } from "../../services/post-services";
import Link from "next/link";

export default function PostsList() {
    const posts = use<Post[]>(getAllPosts());

    return (
        <>
            {posts.map((post) => (
                <Link href={`/posts/${post.id}`} key={post.id}>
                    <PostCard post={post} />
                </Link>
            ))}
        </>
    );
}
