import {getModelForClass, modelOptions, mongoose, prop, Severity} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import UserModel from "../../Users/schema/user.schema";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})

class Posts extends TimeStamps {

    @prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: () => UserModel })
    public userId?: string;

    @prop({ required: true, type: String })
    public title?: string;

    @prop({ required: true, type: String })
    public content?: string;

    @prop({ required: false, type: Boolean, default: true })
    public published?: boolean;

}


const PostsModel = getModelForClass(Posts);
export default PostsModel;
