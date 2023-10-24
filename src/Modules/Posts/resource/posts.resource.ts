import { UserResource } from "../../Users/resource/user.resource";
import { IPosts } from "../entity/posts.entity";

export class PostsResource {

    public static async collection(posts: IPosts[]) {
        let data: any[] = [];
        let single: any;
        for (let post of posts) {
            single = await PostsResource.single(post);
            data.push(single);
        }

        return data;
    }

    public static async single(post: IPosts) {
        return {
            id: post.id,
            userId: post.userId,
            title: post.title,
            content: post.content,
            published: post.published,
            author: await UserResource.author(post.userId),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        }
    }

}