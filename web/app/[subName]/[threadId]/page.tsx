import React, { use } from "react";
import SingleThread from "../../../components/Threads/SingleThread";
import { getPost } from "../../../services/post-services";
import { getThread } from "../../../services/thread-services";
import Post from "../../../types/Post";
import Thread from "../../../types/Thread";

export default function ThreadPage({ params }: { params: { threadId: string } }) {
	const thread = use<Thread>(getThread(params.threadId));
	const post = use<Post>(getPost(thread.post.id));
	return (
		<>
			<SingleThread thread={thread} post={post} />
		</>
	);
}
