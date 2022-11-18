import { use } from "react";
import PostCard from "./PostCard";
import Thread from "../../types/Thread";
import { getAllPosts } from "../../services/post-services";
import Link from "next/link";

export default function PostsList() {
    const posts = use<Thread[]>(getAllPosts());

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
