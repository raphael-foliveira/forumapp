import SingleThread from "../../../components/Threads/SingleThread";
import { getPost } from "../../../services/post-services";
import { getThread } from "../../../services/thread-services";

export default async function ThreadPage({ params }: { params: { threadId: string; }; }) {
	const thread = await getThread(params.threadId);
	const post = await getPost(thread.post.id);
	return (
		<>
			<SingleThread thread={thread} post={post} />
		</>
	);
}
