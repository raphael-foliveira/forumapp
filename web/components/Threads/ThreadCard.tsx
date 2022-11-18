import { Text, Card } from "@chakra-ui/react";
import Thread from "../../types/Thread";

export default function PostCard({ thread: thread }: { thread: Thread }) {

    return (
        <Card padding={5}>
            <Text as="h3" fontWeight={"bold"}>
                {thread.title}
            </Text>
            <Text as="p">{thread.post.content}</Text>
            <Text>by: {thread.post.author?.username}</Text>
            <Text>{thread.post.children.length} comments</Text>
        </Card>
    );
}
