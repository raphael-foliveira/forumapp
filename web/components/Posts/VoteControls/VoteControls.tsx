"use client";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteVote, getPostVotes, upsertVote } from "../../../services/vote-services";
import { RootState } from "../../../store/store";
import Post from "../../../types/Post";

export default function VoteControls({ post }: { post: Post }) {
    const [voteCount, setVoteCount] = useState<number>(0);
    const [voteState, setVoteState] = useState({
        up: false,
        down: false,
    });
    const authData = useSelector((state: RootState) => state.auth);

    const handleUpVote = async (event: MouseEvent<HTMLButtonElement>) => {
        if (voteState.up) {
            setVoteCount(voteCount - 1);
            await deleteVote(post.id, authData.userId, authData.token);
        } else if (voteState.down) {
            setVoteCount(voteCount + 2);
            await upsertVote(post.id, authData.userId, 1, authData.token);
        } else {
            setVoteCount(voteCount + 1);
            await upsertVote(post.id, authData.userId, 1, authData.token);
        }
        setVoteState((prevState) => {
            return {
                up: !prevState.up,
                down: false,
            };
        });
    };
    const handleDownVote = async (event: MouseEvent<HTMLButtonElement>) => {
        if (voteState.down) {
            setVoteCount(voteCount + 1);
            await deleteVote(post.id, authData.userId, authData.token);
        } else if (voteState.up) {
            setVoteCount(voteCount - 2);
            await upsertVote(post.id, authData.userId, -1, authData.token);
        } else {
            setVoteCount(voteCount - 1);
            await upsertVote(post.id, authData.userId, -1, authData.token);
        }

        setVoteState((prevState) => {
            return {
                down: !prevState.down,
                up: false,
            };
        });
    };

    useEffect(() => {
        getPostVotes(post.id).then((votes) => {
            for (let vote of votes) {
                setVoteCount(voteCount + vote.value);

                if (authData.userId === vote.user.id) {
                    setVoteState({
                        up: vote.value === 1,
                        down: vote.value === -1,
                    });
                }
            }
        });
    }, []);

    return (
        <Box>
            <Flex flexDirection={"column"}>
                <Button onClick={handleUpVote} id="up" p="0">
                    <ArrowUpIcon fontSize={"2xl"} color={voteState.up ? "orange.400" : "black"} />
                </Button>
                <Text textAlign={"center"}>{voteCount}</Text>

                <Button id="down" onClick={handleDownVote} p="0">
                    <ArrowDownIcon
                        fontSize={"2xl"}
                        color={voteState.down ? "orange.400" : "black"}
                    />
                </Button>
            </Flex>
        </Box>
    );
}
