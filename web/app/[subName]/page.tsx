import { redirect } from "next/navigation";
import { use } from "react";
import MemberShipControls from "../../components/SubForums/Page/MembershipControls";
import SubForumInfo from "../../components/SubForums/Page/SubForumInfo";
import { getSubForum } from "../../services/subforums-services";
import SubForum from "../../types/SubForum";

export default function SubForumPage({ params }: { params: { subName: string } }) {
    const subForum = use(getSubForum(params.subName));
    if (!subForum.name) {
        redirect("/");
    }

    return (
        <>
            <MemberShipControls subForum={subForum} />
            <SubForumInfo subForum={subForum} />
        </>
    );
}
