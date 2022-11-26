"use client";
import { Avatar, Flex, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/auth-services";
import { deauthorize } from "../store/auth/authSlice";
import { RootState } from "../store/store";

export default function NavBar() {
    const authData = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [avatarSrc, setAvatarSrc] = useState<string>("");

    useEffect(() => {
        if (authData.isAuthenticated) {
            getUser(authData.userId).then((userData) => {
                setAvatarSrc(userData.profilePicture);
                setUsername(userData.username)
            });
        }
    }, [authData]);

    return (
        <Skeleton isLoaded={!authData.loading}>
            <Flex direction={"row"} gap={5} padding="10px 20px" height={"80px"} alignItems="center">
                <Link href="/">Home</Link>

                <Flex
                    direction={"row"}
                    height="100%"
                    alignItems={"center"}
                    gap={5}
                    marginLeft="auto"
                    paddingRight={10}
                >
                    {authData.isAuthenticated ? (
                        <>
                            <Link
                                href="#"
                                onClick={() => {
                                    dispatch(deauthorize());
                                    localStorage.setItem("token", "");
                                }}
                            >
                                {username}
                            </Link>
                            <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}/${avatarSrc}`} />
                        </>
                    ) : (
                        <Link href={"/login"}>Login</Link>
                    )}
                </Flex>
            </Flex>
        </Skeleton>
    );
}
