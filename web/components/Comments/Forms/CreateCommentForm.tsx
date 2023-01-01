"use client";
import { Box, Button, Textarea, Text } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { createPost } from "../../../services/post-services";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Post from "../../../types/Post";

export default function CreateCommentForm({
	parent,
	handleSubmitComment,
}: {
    parent: Post;
    handleSubmitComment: (newComment: Post) => void;
}) {
	const [comment, setComment] = useState("");
	const [isHidden, setIsHidden] = useState(true);
	const authData = useSelector((state: RootState) => state.auth);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const newPost = await createPost({ content: comment, parent: parent }, authData.token);
		if (!newPost) {
			return;
		}
		handleSubmitComment(newPost);
		setIsHidden(true);
		setComment("");
	};

	return (
		<form action="" onSubmit={handleSubmit}>
			<Text onClick={() => setIsHidden(!isHidden)} as="button" type="button" fontSize={"xs"}>
				{isHidden ? "Add Comment" : "Cancel"}
			</Text>
			<Box hidden={isHidden}>
				<Textarea
					name="comment"
					onChange={(event) => {
						setComment(event.target.value);
					}}
					value={comment}
				/>
				<Button type="submit">Submit</Button>
			</Box>
		</form>
	);
}
