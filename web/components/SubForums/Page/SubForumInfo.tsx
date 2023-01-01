"use client";
import React from "react";
import { Text, Image } from "@chakra-ui/react";
import ThreadCard from "../../Threads/ThreadCard";
import Link from "next/link";
import SubForum from "../../../types/SubForum";

export default function SubForumInfo({ subForum }: { subForum: SubForum }) {
	return (
		<>
			<Text as="h1" textAlign={"center"} fontWeight="bold" fontSize={"xl"}>
				{subForum.name}
			</Text>
			<Text>{subForum.description}</Text>
			{subForum.image && (
				<Image
					src={process.env.NEXT_PUBLIC_API_URL + "/" + subForum.image}
					maxH="500px"
					w="auto"
					margin="auto"
				/>
			)}
			<Text as="h1" fontSize={"xl"} fontWeight="bold">
				Threads
			</Text>
			{subForum.threads &&
				subForum.threads.map((thread) => {
					return (
						<Link key={thread.id} href={`/${subForum.name}/${thread.id}`}>
							<ThreadCard threadId={thread.id} />
						</Link>
					);
				})}
		</>
	);
}
