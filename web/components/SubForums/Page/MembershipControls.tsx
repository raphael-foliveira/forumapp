"use client";
import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Fetcher from "../../../tools/Fetcher";
import SubForum from "../../../types/SubForum";

export default function MemberShipControls({ subForum }: { subForum: SubForum }) {
    const [isMember, setIsMember] = useState(false);
    const authData = useSelector((state: RootState) => state.auth);
    const joinSubHandler = async () => {
        if (!subForum) {
            return;
        }
        const relationShipData = {
            subForumId: subForum.id,
            userId: authData.userId,
        };

        Fetcher.post(`/members`, relationShipData, authData.token);
        setIsMember(true);
    };
    useEffect(() => {
        if (subForum.members) {
            setIsMember(subForum.members.map((member) => member.id).includes(authData.userId));
        }
    }, []);

    const leaveSubHandler = async () => {
        if (!subForum) {
            return;
        }
        Fetcher.delete(`/subforums/${subForum.id}/members/${authData.userId}`, authData.token);
        setIsMember(false);
    };
    return (
        <>
            {authData.isAuthenticated && isMember ? (
                <Flex justifyContent={"space-between"}>
                    <Link href={`/${subForum.name}/create-thread`}>
                        <Button>Create new Thread</Button>
                    </Link>
                    <Button onClick={leaveSubHandler}>Leave Sub</Button>
                </Flex>
            ) : (
                <Button onClick={joinSubHandler}>Join Sub</Button>
            )}
        </>
    );
}
