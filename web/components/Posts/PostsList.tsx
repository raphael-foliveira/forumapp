import { use } from "react";
import ThreadCard from "../Threads/ThreadCard";
import Thread from "../../types/Thread";
import { getAllPosts } from "../../services/post-services";
import Link from "next/link";
import { getAllThreads } from "../../services/thread-services";

export default function PostsList() {
    const threads = use<Thread[]>(getAllThreads());

    return (
        <>
            {threads.map((thread) => (
                <Link href={`/posts/${thread.id}`} key={thread.id}>
                    <ThreadCard threadId={thread.id} />
                </Link>
            ))}
        </>
    );
}
