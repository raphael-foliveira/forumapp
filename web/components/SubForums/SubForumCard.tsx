import { Card, Image, Text } from "@chakra-ui/react";
import SubForum from "../../types/SubForum";

export default function SubForumCard({ subForum }: { subForum: SubForum }) {
    return (
        <Card padding={"10px"}>
            <Text as="h3">{subForum.name}</Text>
            <Text as="p">{subForum.description}</Text>
            <Text>Owner: {subForum.admin.username}</Text>
            <Text>{subForum.members.length} members</Text>
            {subForum.image && (
                <Image
                    src={process.env.NEXT_PUBLIC_API_URL + "/" + subForum.image}
                    width={"200px"}
                    height={"auto"}
                />
            )}
            <Text>Created at: { new Date(Date.parse(subForum.createdAt)).toDateString()}</Text>
        </Card>
    );
}
