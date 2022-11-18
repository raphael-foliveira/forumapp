"use client";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThreadCard from "../../components/Threads/ThreadCard";
import { getSubForum } from "../../services/subforums-services";
import { RootState } from "../../store/store";
import Fetcher from "../../tools/Fetcher";
import SubForum from "../../types/SubForum";
  
export default function SubForumPage({ params }: { params: { subName: string } }) {
    const [subForum, setSubForum] = useState<SubForum>();
    const router = useRouter();
    const authData = useSelector((state: RootState) => state.auth);
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        getSubForum(params.subName).then((sub) => {
            if (!sub) {
                router.push("/");
                return;
            }
            setSubForum(sub);
            setIsMember(sub.members.map((member) => member.id).includes(authData.userId));
        });
    }, []);

    const joinSubHandler = async () => {
        if (!subForum) {
            return;
        }
        const relationShipData = {
            subForumId: subForum.id,
            userId: authData.userId,
        };

        Fetcher.post(`/subforums/${subForum.id}/members`, relationShipData, authData.token);
        setIsMember(true);
    };

    const leaveSubHandler = async () => {
        if (!subForum) {
            return;
        }
        Fetcher.delete(`/subforums/${subForum.id}/members/${authData.userId}`, authData.token);
        setIsMember(false);
    };

    return (
        <>
            {subForum && (
                <>
                    {authData.isAuthenticated && (
                        <>
                            {isMember ? (
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
                    )}
                    <Text as="h1" textAlign={"center"}>
                        {subForum.name}
                    </Text>
                    <Text>{subForum.description}</Text>
                    {subForum.image && (
                        <Image
                            src={process.env.NEXT_PUBLIC_API_URL + "/" + subForum.image}
                            maxH="500px"
                            w="auto"
                            margin="auto"
                        />
                    )}
                    {subForum.threads.map((thread) => {
                        return <ThreadCard thread={thread} />;
                    })}
                </>
            )}
        </>
    );
}
