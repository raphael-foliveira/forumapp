import CommentForm from "../../../components/Posts/Forms/CommentForm";
import SinglePost from "../../../components/Posts/SinglePost";
import { getPost } from "../../../services/post-services";

export default function SinglePostPage({ params }: { params: { threadId: string } }) {
    return (
        <>
            <SinglePost postId={params.threadId} />
            <CommentForm />
        </>
    );
}
