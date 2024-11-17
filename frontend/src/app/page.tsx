import Posts from "@/components/posts/Posts";
import { createPost } from "@/lib/actions";
import { fetchPosts } from "@/lib/data";
import { IPost } from "@/lib/types";
import os from "os";

export const dynamic = "force-dynamic";

export default async function Home() {
  const hostname = os.hostname();
  const posts: IPost[] | number = await fetchPosts();

  return (
    <div className="min-h-screen flex flex-col items-center p-20 space-y-5">
      <div className="w-1/2 space-y-5">
        <h1 className="text-4xl">Realtime posts</h1>
        <h2 className="text-2xl">You are on { hostname }</h2>
        <h3>Write your post!</h3>
      </div>
      <form action={createPost} className="flex flex-col items-center w-1/2 space-y-5">
        <label htmlFor="username" className="w-full">Username</label>
        <input type="text" name="username" placeholder="Write your username..." className="w-full h-10 text-black px-2 py-1 rounded-sm" />
        <label htmlFor="content" className="w-full">Post</label>
        <textarea name="content" maxLength={200} placeholder="What is on your mind..." className="w-full h-36 text-black p-2 resize-none rounded-sm" />
        <button className="bg-white w-full py-1 text-lg text-black rounded-sm">Post</button>
      </form>
      <Posts postsProps={posts} />
    </div>
  );
}
