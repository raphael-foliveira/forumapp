import { redirect } from "next/navigation";
import React, { use } from "react";
import MemberShipControls from "../../components/SubForums/Page/MembershipControls";
import SubForumInfo from "../../components/SubForums/Page/SubForumInfo";
import { getSubForum } from "../../services/subforums-services";

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
