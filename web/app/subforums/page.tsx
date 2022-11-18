"use client";
import { Button } from "@chakra-ui/react";
import { use, useEffect, useState } from "react";
import CreateSubForumForm from "../../components/SubForums/Forms/CreateSubForumForm";
import SubForumCard from "../../components/SubForums/SubForumCard";
import { getAllSubForums } from "../../services/subforums-services";
import SubForum from "../../types/SubForum";

export default function SubForumsPage() {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [allSubs, setAllSubs] = useState<SubForum[]>([]);

    useEffect(() => {
        getAllSubForums().then((subs) => {
            setAllSubs(subs);
        });
    }, []);

    const toggleHiddenForm = () => {
        setIsHidden(!isHidden);
    };

    return (
        <>
            <Button onClick={toggleHiddenForm}>Create Sub</Button>
            <CreateSubForumForm isHidden={isHidden} />
            <div>
                {allSubs.map((sub) => (
                    <div key={sub.id}>
                        <SubForumCard subForum={sub} />
                    </div>
                ))}
            </div>
        </>
    );
}
