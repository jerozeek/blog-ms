import { UserResource } from "../../Users/resource/user.resource";
import { IComments } from "../entity/comment.entity";

export class CommentResource {

    public static async single(comment: IComments) {
        return {
            id: comment.id,
            user: await UserResource.author(comment.userId),
            postId: comment.postId,
            message: comment.message,
            createdAt: comment.createdAt,
        }
    }

    public static async collection(comments: IComments[]) {
        let data: any[] = [];
        let single: any;
        for (let comment of comments) {
            single = await CommentResource.single(comment);
            data.push(single);
        }

        return data;
    }
}