import mongoose from 'mongoose';
import { IBlogAttr, IBlogDoc } from '../interfaces/blog';
import slugify from 'slugify';
interface IBlogModel extends mongoose.Model<IBlogDoc> {
  build(att: IBlogAttr): IBlogDoc;
}
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: Boolean,
      default: false,
    },
    images: {
      type: String,
      default: 'blog_default.png',
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        slug: {
          type: String,
          unique: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

blogSchema.statics.build = (attr: IBlogAttr) => {
  return new Blog(attr);
};
blogSchema.pre<IBlogDoc>('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = mongoose.model<IBlogDoc, IBlogModel>('Blog', blogSchema);

export { Blog };
