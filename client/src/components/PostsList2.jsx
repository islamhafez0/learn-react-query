import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPosts } from "../api/posts";

const PostsList2 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: Date.now(), title: "Loading" }],
  });
  if (postsQuery.status === "loading") return <h1>Loading....</h1>;
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }
  return (
    <div>
      <h1>Posts list 2</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.title}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostsList2;
