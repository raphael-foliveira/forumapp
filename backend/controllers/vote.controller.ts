import { Request, Response } from "express";
import Vote from "../entities/vote.entity";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export default {

	async getVotesHandler(req: Request, res: Response) {
		const votes = await Vote.objects.find({
			where: {
				user: {
					id: req.query.userId as string,
				},
				post: {
					id: req.query.postId as string,
				},
			},
			relations: ["user", "post"]
		});
		res.status(200).json(votes);
	},

	async getVoteHandler(req: Request, res: Response) {
		const vote = await Vote.objects.findOne({
			where: {
				id: req.params.id,
			},
			relations: ["user", "post"]
		});
		res.status(200).json(vote);
	},

	async deleteVoteHandler(req: AuthenticatedRequest, res: Response) {
		if (!req.user) {
			console.log("Unauthenticated request");
			res.sendStatus(403);
			return;
		}
		if (!req.query.userId || !req.query.postId) {
			console.log("Couldn't find vote");
			res.sendStatus(400);
			return;
		}
		console.log(req.query);
		const vote = await Vote.objects.findOne({
			where: {
				user: {
					id: req.query.userId as string,
				},
				post: {
					id: req.query.postId as string,
				},
			},
		});
		if (!vote) {
			console.log("Vote deletion failed.");
			res.sendStatus(500);
			return;
		}
		console.log("Deleting vote");
		console.log(vote);
		const result = await Vote.objects.delete(vote);
		res.status(200).json(result);
	},

	async upsertVoteHandler(req: AuthenticatedRequest, res: Response) {
		if (!req.user) {
			console.log("Unauthenticated request");
			res.sendStatus(403);
			return;
		}
		const selectedVote = await Vote.objects.findOne({
			where: {
				user: {
					id: req.query.userId as string,
				},
				post: {
					id: req.query.postId as string,
				},
			},
			relations: {
				post: true,
				user: true,
			},
		});
		if (selectedVote) {
			console.log("Vote found");

			selectedVote.value = req.body.value as 1 | -1;
			const updatedVote = await Vote.objects.save(selectedVote);
			console.log(selectedVote);
			res.status(200).json(updatedVote);
			return;
		}
		console.log("Vote not found. Creating...");

		const newVote = Vote.objects.create({
			user: {
				id: req.query.userId as string,
			},
			post: {
				id: req.query.postId as string,
			},
			value: req.body.value,
		});
		const result = await Vote.objects.save(newVote);
		console.log(result);

		res.status(200).json(result);
	},
};

