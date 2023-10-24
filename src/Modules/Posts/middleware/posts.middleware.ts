import { NextFunction, Request, Response } from 'express';
import { CreatePostsSchema } from './validation.middleware';
import { IPostsDto } from '../entity/posts.entity';
import { PostsFacade } from '../facade/posts.facade';


export class PostsAuth {


    public static postDto: IPostsDto;

    private static postService = PostsFacade.Service();

    public static async isValidPostId(req: Request, res: Response, next: NextFunction):Promise<void> {
        try {
            if (!req.body.postId) throw new Error('Post id is required');
            const post = await PostsAuth.postService.getPostById(req.body.postId);
            if (!post) throw new Error('Post not found');

            return next();
        }
        catch (error) {
            next(error);
        }
    }

    public static async canCreatePosts(req: Request, res: Response, next: NextFunction):Promise<void> {
        try {
            const data = CreatePostsSchema.safeParse(req.body);
            if (!data.success) throw new Error(data.error.issues[0].message);

            PostsAuth.postDto = {
                ...data.data,
                userId: req.user.id,
            }

            return next();
        }
        catch (error) {
            next(error);
        }
    }

}