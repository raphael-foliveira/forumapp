import React from "react";
import { Card, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import SubForum from "../../types/SubForum";
import styled from "@emotion/styled";

const PointerDiv = styled.div`
    :hover {
        cursor: pointer;
    }
`;

export default function SubForumCard({ subForum }: { subForum: SubForum; }) {
	const router = useRouter();
	return (
		<PointerDiv>
			<Card padding={"10px"} onClick={() => router.push(`/${subForum.name}`)}>
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
				<Text>Created at: {new Date(Date.parse(subForum.createdAt)).toDateString()}</Text>
			</Card>
		</PointerDiv>
	);
}
