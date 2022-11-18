import { Text, Card } from "@chakra-ui/react";
import Thread from "../../types/Thread";

export default function PostCard({ post }: { post: Thread }) {

    return (
        <Card padding={5}>
            <Text as="h3" fontWeight={"bold"}>
                {post.title}
            </Text>
            <Text as="p">{post.content}</Text>
            <Text>by: {post.author?.username}</Text>
            <Text>{post.comments.length} comments</Text>
        </Card>
    );
}
