"use client";
import {
    Button, Flex, FormControl,
    FormLabel, Image, Input, Text, Wrap
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Fetcher from "../../tools/Fetcher";

export default function RegistrationForm() {
    const [formState, setFormState] = useState<RegisterForm>(registerFormInitialState);
    const [preview, setPreview] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>("");
    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };

    const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    profilePicture: files[0],
                };
            });
        }
    };

    const handleClearProfilePicture = () => {
        setPreview("");
        setFormState((prevState) => {
            return {
                ...prevState,
                profilePicture: null,
            };
        });
    };

    useEffect(() => {
        if (!formState.profilePicture) {
            setPreview("");
            return;
        }

        const objectUrl = URL.createObjectURL(formState.profilePicture);
        setPreview(objectUrl);
    }, [formState.profilePicture]);

    const validatePassword = () => {
        if (formState.password !== formState.confirmPassword || formState.password.length < 6) {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    passwordInvalid: true,
                };
            });
            return false;
        }
        return true;
    };

    const validateEmail = () => {
        if (formState.email.length === 0) {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    emailInvalid: true,
                };
            });
            return false;
        }
        return true;
    };

    const validateUsername = () => {
        if (formState.username.length === 0) {
            setFormState((prevState) => {
                return {
                    ...prevState,
                    usernameInvalid: true,
                };
            });
            return false;
        }
        return true;
    };

    const formIsValid = () => {
        validateUsername();
        validatePassword();
        validateEmail();
        if (formState.emailInvalid || formState.passwordInvalid || formState.usernameInvalid) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        let formData = new FormData();
        formData.append("username", formState.username);
        formData.append("password", formState.password);
        formData.append("email", formState.email);
        if (formState.profilePicture) {
            formData.append("profilePicture", formState.profilePicture);
        }
        const newUser = await Fetcher.postFormData("/users", formData);
        if (newUser) {
            router.push("/login");
        }
    };

    return (
        <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
            <Wrap maxWidth="800px" margin="auto">
                <Text as="h1" textAlign={"center"} width="100%">
                    Register
                </Text>

                <FormControl isInvalid={formState.usernameInvalid}>
                    <FormLabel>Username</FormLabel>
                    <Input onChange={handleChange} name="username" value={formState.username} />
                </FormControl>
                <FormControl isInvalid={formState.emailInvalid}>
                    <FormLabel>Email</FormLabel>
                    <Input onChange={handleChange} name="email" value={formState.email} />
                </FormControl>

                <FormControl isInvalid={formState.passwordInvalid}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        value={formState.password}
                    />
                </FormControl>

                <FormControl isInvalid={formState.passwordInvalid}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        onChange={handleChange}
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        type="password"
                    />
                </FormControl>

                <FormLabel>Profile Picture</FormLabel>
                <Input
                    paddingTop={"5px"}
                    onChange={handleFileInput}
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                />
                <Flex width="100%">
                    <Button marginLeft={"auto"} onClick={handleClearProfilePicture}>
                        Clear Profile Picture
                    </Button>
                </Flex>

                <Button type="submit">Register</Button>
                {preview && <Image src={preview} />}
            </Wrap>
        </form>
    );
}

export type RegisterForm = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicture: File | null;
    usernameInvalid: boolean;
    emailInvalid: boolean;
    passwordInvalid: boolean;
};

const registerFormInitialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    usernameInvalid: false,
    emailInvalid: false,
    passwordInvalid: false,
};
