import Link from "next/link";
import React, { use } from "react";
import { getAllThreads } from "../../services/thread-services";
import Thread from "../../types/Thread";
import ThreadCard from "../Threads/ThreadCard";

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
