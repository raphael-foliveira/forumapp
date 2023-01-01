import { Request, Response } from "express";
import Post from "../entities/post.entity";
import Vote from "../entities/vote.entity";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export default {
	async createPostHandler(
		req: AuthenticatedRequest,
		res: Response
	): Promise<Post | void> {
		if (!req.user) {
			res.status(403).json({
				error: "Not authenticated.",
			});
			return;
		}

		try {
			const newPostData = Post.objects.create({
				author: req.user,
				parent: req.body.parent,
				content: req.body.content,
			});
			const newPost = await Post.objects.save(newPostData);
			res.status(201).json(newPost);
		} catch (e) {
			res.status(500).json(e);
		}
	},

	async getPostHandler(req: Request, res: Response) {
		const post = await Post.objects.findOne({
			where: {
				id: req.params.id,
			},
			relations: ["children", "parent", "author", "votes"],
		});
		if (!post) {
			console.log("Post not found.");
			res.sendStatus(404);
			return;
		}
		console.log("Found Post:");
		console.log(post);

		res.status(200).json(post);
	},

	async getPostVotesHandler(req: Request, res: Response) {
		const votes = await Vote.objects.find({
			where: {
				post: {
					id: req.params.id,
				},
			},
			relations: ["user", "post"]
		});
		console.log("Found Votes");
		console.log(votes);

		res.status(200).json(votes);
	},

};





