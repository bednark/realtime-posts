"use client";
import Post from "@/components/posts/post/Post";
import { IPost } from "@/lib/types";
import { useState, useEffect } from "react";

interface IPostsProps {
  postsProps: IPost[] | number;
}

export default function Posts({ postsProps }: IPostsProps) {
  const [posts, setPosts] = useState<IPost[] | number>(postsProps);
  const [connectionFailed, setConnectionFailed] = useState<boolean>(posts === 1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if(!connectionFailed) {
      const ws = new WebSocket("ws://localhost:4000");
      ws.OPEN;
      ws.onmessage = (event: MessageEvent) => {
        const newPost = JSON.parse(event.data);
        setPosts((prevPosts) => Array.isArray(prevPosts) ? [newPost, ...prevPosts] : [newPost]);
      }

      ws.onerror = () => setConnectionFailed(true);
    }
    setLoading(false);
  }, []);

  return (
    <div className="w-3/4 space-y-5">
      {Array.isArray(posts) && posts.length !== 0 ? (
        posts.map((post: IPost, index: number) => (
          <Post key={index} username={post.username} content={post.content} />
        ))
      ) : (
        <p className="w-full text-center text-xl pt-20">
          {loading ? "Loading..." : connectionFailed ? "Failed to connect to the database" : "No posts yet"}
        </p>
      )}
    </div>
  );
}