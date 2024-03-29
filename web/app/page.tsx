"use client";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateSubForumForm from "../components/SubForums/Forms/CreateSubForumForm";
import SubForumsList from "../components/SubForums/SubForumsList";
import { getAllSubForums } from "../services/subforums-services";
import SubForum from "../types/SubForum";

export default function Home() {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [allSubs, setAllSubs] = useState<SubForum[]>([]);

    useEffect(() => {
        getAllSubForums().then((subForums) => {
            setAllSubs(subForums);
        });
    }, []);

    const toggleHiddenForm = () => {
        setIsHidden(!isHidden);
    };

    return (
        <>
            <Button onClick={toggleHiddenForm}>Create Sub</Button>
            <CreateSubForumForm
                isHidden={isHidden}
                allSubs={allSubs}
                setAllSubs={setAllSubs}
            />
            <SubForumsList allSubs={allSubs} />
        </>
    );
}
