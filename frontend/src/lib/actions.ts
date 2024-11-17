"use server";
import connectToDatabase from "@/lib/utils";
import { PostModel } from "@/lib/models";

export const createPost = async (data: FormData) => {
  const ws = new WebSocket(process.env.WS_URL!);
  const { username, content } = Object.fromEntries(data);
  const creationTime = new Date().toISOString();

  try {
    connectToDatabase();

    const newPost = new PostModel({ username, content, creationTime });
    await newPost.save();

    if(ws.readyState === ws.OPEN)
      ws.send(JSON.stringify({ username, content, creationTime }))
    else
      ws.onopen = () => ws.send(JSON.stringify({ username, content, creationTime }))

    ws.onerror = () => console.log("There was an error with connection to ws")
  }
  catch (error) {
    console.error(error);
    throw new Error((error as Error).message);
  }
}