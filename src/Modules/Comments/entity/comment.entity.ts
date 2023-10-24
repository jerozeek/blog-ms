
export interface IComments extends ICommentsDto {
    id: string;
    createdAt: string;
}

export interface ICommentsDto  {
    postId: string;
    userId: string;
    message: string;
}

export interface ICommentRepository {
    create(data: ICommentsDto): Promise<IComments>;
    findByPostId(postId: string): Promise<IComments[]>;
}

export interface ICommentService {
    createComment(data: ICommentsDto): Promise<IComments>;
    getCommentsByPostId(postId: string): Promise<IComments[]>;
}
