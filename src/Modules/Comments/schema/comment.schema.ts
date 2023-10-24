import {getModelForClass, modelOptions, mongoose, prop, Severity} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import PostsModel from "../../Posts/schema/posts.schema";
import UserModel from "../../Users/schema/user.schema";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})

class Comments extends TimeStamps {

    @prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: () => PostsModel })
    public postId?: string;

    @prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: () => UserModel })
    public userId?: string;

    @prop({ required: true, type: String })
    public message?: string;

}

const CommentsModel = getModelForClass(Comments);
export default CommentsModel;
