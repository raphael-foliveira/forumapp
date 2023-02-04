import Thread from "../entities/thread.entity";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import Post from "../entities/post.entity";
import SubForum from "../entities/subforum.entity";

export default {

	async getThreadsHandler(req: Request, res: Response) {
		const allThreads = await Thread.objects.find({
			relations: ["post"],
		});
		res.status(200).json(allThreads);
	},

	async getThread(req: Request, res: Response) {
		try {
			const singleThread = await Thread.objects.findOne({
				where: {
					id: req.params.id,
				},
				relations: ["post"],
			});
			if (!singleThread) {
				console.log(`Thread ${req.params.id} not found`);
	
				res.sendStatus(404);
				return;
			}
			console.log("Found thread:");
			console.log(singleThread);
			res.status(200).json(singleThread);
		} catch (exception) {
			console.log(exception)
			res.status(400).json({
				"error": "bad uuid"
			})
		}
			

	},

	async createThreadHandler(req: AuthenticatedRequest, res: Response) {
		if (!req.query.subForumName || !req.body.postId || !req.user) {
			res.sendStatus(400);
			return;
		}

		const subForum = await SubForum.objects.findOne({
			where: {
				name: req.query.subForumName as string,
			},
		});

		if (!subForum) {
			res.status(400).json({
				message: "SubForum does not exist.",
			});
			return;
		}

		const post = await Post.objects.findOne({
			where: {
				id: req.body.postId,
			},
		});

		if (!post) {
			res.status(404).json({
				error: "Post not found",
			});
			return;
		}

		const threadData = {
			title: req.body.title,
			content: req.body.content,
			image: req.file?.path || "",
			subForum: subForum,
			post: post,
		};

		try {
			const threadObject = Thread.objects.create(threadData);
			const newThread = await Thread.objects.save(threadObject);
			res.status(201).json(newThread);
		} catch (e) {
			res.status(400).json(e);
		}
	},
};

