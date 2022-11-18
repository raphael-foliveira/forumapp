import { Box, Button, FormLabel, Input, Textarea, Wrap } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { createSubForum } from "../../../services/subforums-services";
import { RootState } from "../../../store/store";
import Fetcher from "../../../tools/Fetcher";

export default function CreateSubForumForm({ isHidden }: { isHidden: boolean }) {
    const [formState, setFormState] = useState<CreateSubForm>({
        name: "",
        description: "",
        image: null,
    });
    const authData = useSelector((state: RootState) => state.auth);

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    image: files[0],
                };
            });
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <Box hidden={isHidden} maxW="400px" margin={"auto"}>
            <form
                action=""
                onSubmit={async (event) => {
                    event.preventDefault();
                    const formData = new FormData();
                    formData.append("name", formState.name);
                    formData.append("description", formState.description);
                    if (formState.image) {
                        formData.append("image", formState.image);
                    }
                    return createSubForum(formData, authData.token);
                }}
            >
                <Wrap>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" onChange={handleChange} />
                    <FormLabel>Description</FormLabel>
                    <Textarea name="description" onChange={handleChange} />
                    <FormLabel>Image</FormLabel>
                    <Input type="file" name="image" accept="image/*" onChange={handleChangeImage} />
                    <Button type="submit">Submit</Button>
                </Wrap>
            </form>
        </Box>
    );
}

export type CreateSubForm = {
    name: string;
    description: string;
    image: File | null;
};
