"use client";
import React, { useState } from "react";
import { Textarea, Button } from "@chakra-ui/react";

export default function CommentForm() {
	const [comment, setComment] = useState("");

	return (
		<form
			action=""
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<Textarea
				onChange={(event) => {
					event.preventDefault();
					setComment(event.target.value);
				}}
				value={comment}
			/>
			<Button type="submit">Submit</Button>
		</form>
	);
}
