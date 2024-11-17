import connectToDatabase from "@/lib/utils";
import { PostModel } from "@/lib/models";
import { IPost } from "@/lib/types";

export async function fetchPosts(): Promise<IPost[] | number> {
  try {
    connectToDatabase();

    const posts = await PostModel.find({}).sort({ creationTime: -1 });
    return posts.map(post => ({
      _id: post._id.toString(),
      username: post.username,
      content: post.content
    }));
  }
  catch (error) {
    console.error(error);
    return 1;
  }
}