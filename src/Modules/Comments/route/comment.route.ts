import { Router } from 'express';
import { use } from '../../../Core/middleware/use.middleware';
import { CommentAuth } from '../middleware/comment.middleware';
import { CommentController } from '../http/comment.controller';
import { PostsAuth } from '../../Posts/middleware/posts.middleware';

const router = Router();

router.post('/create', [CommentAuth.canCreateComment, PostsAuth.isValidPostId], use(CommentController.create))
router.get('/get/:postId', use(CommentController.getCommentsByPostId));

export = router;