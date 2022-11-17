"use client";
import Link from "next/link";
import { Box, Flex, Skeleton, Spinner, Avatar } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { deauthorize } from "../store/auth/authSlice";

export default function NavBar() {
    const authData = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    return (
        <Skeleton isLoaded={!authData.loading}>
            <Flex direction={"row"} gap={5} padding="10px 20px" height={"80px"} alignItems="center">
                <Link href="/">Home</Link>
                <Link href="#">SubForums</Link>

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
                                Logout
                            </Link>
                            <Avatar />
                        </>
                    ) : (
                        <Link href={"/login"}>Login</Link>
                    )}
                </Flex>
            </Flex>
        </Skeleton>
    );
}
