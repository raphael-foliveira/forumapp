import { use, useEffect, useState } from "react";
import { getAllSubForums } from "../../services/subforums-services";
import SubForum from "../../types/SubForum";
import SubForumCard from "./SubForumCard";

export default function SubForumsList() {
    const [allSubs, setAllSubs] = useState<SubForum[]>([]);

    useEffect(() => {
        getAllSubForums().then((subForums) => {
            setAllSubs(subForums);
        });
    }, []);

    return (
        <>
            {allSubs.map((sub) => (
                <div key={sub.id}>
                    <SubForumCard subForum={sub} />
                </div>
            ))}
        </>
    );
}
