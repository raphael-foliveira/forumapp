"use client";
import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import Post from "../../types/Post";
import Thread from "../../types/Thread";
import SinglePost from "../Posts/SinglePost";

export default function SingleThread({ thread, post }: { thread: Thread; post: Post }) {
	return (
		<Box>
			<Text as="h1" fontWeight={"bold"} fontSize="2xl">
				{thread.title}
			</Text>
			{thread.image && (
				<Image
					src={process.env.NEXT_PUBLIC_API_URL + "/" + thread.image}
					maxW="800px"
					h={"auto"}
				/>
			)}
			<SinglePost post={post} />
		</Box>
	);
}
