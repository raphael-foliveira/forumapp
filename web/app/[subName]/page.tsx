"use client";
import { useState, useEffect } from "react";
import { getSubForum } from "../../services/subforums-services";
import SubForum from "../../types/SubForum";
import { Button, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SubForumPage({ params }: { params: { subName: string } }) {
    const [subForum, setSubForum] = useState<SubForum>();
    const router = useRouter();

    useEffect(() => {
        getSubForum(params.subName).then((sub) => {
            if (!sub) {
                router.push("/");
                return;
            }
            setSubForum(sub);
        });
    }, []);

    return (
        <>
            {subForum && (
                <>
                    <Link href={`/${subForum.name}/create-post`}>
                        <Button>
                            Create post
                        </Button>
                    </Link>
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
                    {subForum.posts.map(post => {
                        
                    })}
                </>
            )}
        </>
    );
}
