import { NextFunction, Request, Response } from "express";
import { ICommentsDto } from "../entity/comment.entity";
import { CreateCommentSchema } from "./comment.validation";

export class CommentAuth {

    public static commentDto: ICommentsDto;

    public static async canCreateComment(req: Request, res: Response, next: NextFunction) {
        try {
            const data = CreateCommentSchema.safeParse(req.body);
            if (!data.success) {
                throw new Error(data.error.issues[0].message);
            }

            CommentAuth.commentDto = {
                ...data.data,
                userId: req.user.id
            }

            return next();
        }
        catch (e) {
            return next(e);
        }
    }

}