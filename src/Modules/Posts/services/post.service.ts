import {
    IPosts,
    IPostsDto,
    IPostsRepository,
    IPostsService
} from "../entity/posts.entity";

export class PostService implements IPostsService {

    constructor(private postsRepository: IPostsRepository){}

    public async getAllPosts(): Promise<IPosts[]> {
        return new Promise((resolve, reject) => {
            try {
                const posts = this.postsRepository.findAll();
                return resolve(posts);
            }
            catch (e) {
                return reject(e);
            }
        });
    }


    public async getUsersPosts(userId: string): Promise<IPosts[]> {
        return new Promise((resolve, reject) => {
            try {
                const posts = this.postsRepository.findByUserId(userId);
                return resolve(posts);
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    public async getPostById(id: string): Promise<IPosts> {
        return new Promise((resolve, reject) => {
            try {
                const post = this.postsRepository.findById(id);
                return resolve(post);
            }
            catch (e) {
                return reject(e);
            }
        });
    }

    public async createPost(data: IPostsDto): Promise<IPosts> {
        return new Promise((resolve, reject) => {
            try {
                const post = this.postsRepository.create(data);
                return resolve(post);
            }
            catch (e) {
                return reject(e);
            }
        });
    }



}