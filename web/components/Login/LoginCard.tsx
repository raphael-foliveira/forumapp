"use client";
import { Card, Text, Input, FormLabel, FormControl, Flex, Button } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { loginUser } from "../../services/auth-services";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authorize } from "../../store/auth/authSlice";

const BlueLinks = styled.div`
    a {
        color: blue;
    }
    margin-left: auto;
`;

export default function LoginCard() {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        userNameInvalid: false,
        passwordInvalid: false,
    });
    const router = useRouter();
    const dispatch = useDispatch();

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
    };

    const validateForm = () => {
        setFormState((prevState) => ({
            ...prevState,
            userNameInvalid: formState.username.length < 3,
            passwordInvalid: formState.password.length < 6,
        }));
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (formState.userNameInvalid || formState.passwordInvalid) {
            return;
        }
        loginUser({
            username: formState.username,
            password: formState.password,
        }).then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                dispatch(authorize({ token: data.token, userId: data.userId }));

                router.push("/");
            }
        });
    };

    return (
        <Card padding={5} maxW="400px" margin={"auto"}>
            <Text as="h3">Login</Text>
            <form action="" onSubmit={submitHandler}>
                <Flex padding={4} gap={5} wrap="wrap">
                    <FormControl isInvalid={formState.userNameInvalid}>
                        <FormLabel>User name</FormLabel>
                        <Input
                            type={"text"}
                            name="username"
                            value={formState.username}
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <FormControl isInvalid={formState.passwordInvalid}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type={"password"}
                            name="password"
                            value={formState.password}
                            onChange={changeHandler}
                        />
                    </FormControl>
                    <Button type="submit" onClick={validateForm}>
                        Login
                    </Button>

                    <BlueLinks>
                        <Text as="p" fontSize={"12px"} textAlign="end">
                            or <Link href="/#">Register</Link>
                        </Text>
                    </BlueLinks>
                </Flex>
            </form>
        </Card>
    );
}
