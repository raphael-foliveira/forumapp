import React from "react";
import CreateThreadForm from "../../../components/Threads/Forms/CreateThreadForm";

export default function Page({ params }: { params: { subName: string } }) {
	return <CreateThreadForm subForumName={params.subName} />;
}
