import { redirect } from "next/navigation";
import MemberShipControls from "../../components/SubForums/Page/MembershipControls";
import SubForumInfo from "../../components/SubForums/Page/SubForumInfo";
import { getSubForum } from "../../services/subforums-services";

export default async function SubForumPage({ params }: { params: { subName: string; }; }) {
	const subForum = await getSubForum(params.subName);
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
