import {ICommentRepository, ICommentService, IComments, ICommentsDto} from "../entity/comment.entity";


export class CommentService implements ICommentService {

    constructor(private readonly commentRepository: ICommentRepository) {}

    public async createComment(data: ICommentsDto): Promise<IComments> {
        return new Promise(async (resolve, reject) => {
            try {
                const comment = await this.commentRepository.create(data);
                resolve(comment);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    public async getCommentsByPostId(postId: string): Promise<IComments[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const comments = await this.commentRepository.findByPostId(postId);
                resolve(comments);
            }
            catch (error) {
                reject(error);
            }
        });
    }

}