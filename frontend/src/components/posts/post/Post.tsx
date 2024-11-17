interface PostProps {
  username: string;
  content: string;
}

export default function Post({ username, content }: PostProps) {
  return (
    <div className="border-white border-2 p-5 space-y-5">
      <h4 className="text-xl">{ username }</h4>
      <p className="text-sm px-3">{ content }</p>
    </div>
  );
}