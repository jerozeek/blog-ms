import { Application } from "express";
import authRoute from "../Modules/Users/routes/auth.route";
import userRoute from "../Modules/Users/routes/user.route";
import postsRoute from "../Modules/Posts/route/post.route";
import commentsRoute from "../Modules/Comments/route/comment.route";
import { throttle } from "./middleware/throttle.middleware";
import { Auth } from "../Modules/Users/middleware/auth.middleware";

const BASE_URL = '/api/v1';

export const Register = (app: Application): void => {
    app.use(`${BASE_URL}/auth`, authRoute);
    app.use([throttle(), Auth.guard]);
    app.use(`${BASE_URL}/user`, userRoute);
    app.use(`${BASE_URL}/posts`, postsRoute);
    app.use(`${BASE_URL}/comments`, commentsRoute);
}