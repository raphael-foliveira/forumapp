"use client";
import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Fetcher from "../../../tools/Fetcher";

export default function CreateThreadForm({ subForumName }: { subForumName: string }) {
    const [formState, setFormState] = useState<ThreadFormState>({
        title: "",
        content: "",
    });
    const authData = useSelector((state: RootState) => state.auth);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files?.length > 0) {
            setFormState((prevState) => ({
                ...prevState,
                threadImage: files[0],
            }));
        } else {
            setFormState((prevState) => {
                delete prevState.threadImage;
                return {
                    ...prevState,
                };
            });
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("subForum", subForumName);
        formData.append("title", formState.title);
        formData.append("content", formState.content);
        if (formState.threadImage) {
            formData.append("threadImage", formState.threadImage);
        }
        Fetcher.postFormData(`/threads/${subForumName}`, formData, authData.token);
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <Box margin={"auto"} maxW="600px">
                <Text as="h1" textAlign={"center"} marginBottom={5}>
                    Create Thread
                </Text>
                <FormControl marginBottom={4}>
                    <FormLabel>Title</FormLabel>
                    <Input name="title" onChange={handleChange} />
                </FormControl>
                <FormControl marginBottom={4}>
                    <FormLabel>Content</FormLabel>
                    <Textarea name="content" onChange={handleChange} />
                </FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                    type="file"
                    accept="image/*"
                    name="threadImage"
                    onChange={handleImageChange}
                />
                <Button type="submit" marginTop={4}>
                    Create
                </Button>
            </Box>
        </form>
    );
}

type ThreadFormState = {
    title: string;
    content: string;
    threadImage?: File;
};
