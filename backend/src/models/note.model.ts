import { model, Schema, Types } from "mongoose";

export interface INote {
    title: string;
    content: string;
    userId: Types.ObjectId;
    isPinned: boolean;
    tags: string[];
}

const noteSchema = new Schema<INote>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: 1,
        maxlength: 200,
    },
    content: {
        type: String,
        default: ""
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

noteSchema.index({ user: 1, updatedAt: -1 });

export default model<INote>("Note", noteSchema)