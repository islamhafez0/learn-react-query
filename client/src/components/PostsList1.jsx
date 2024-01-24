import React from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getPost, getPosts } from "../api/posts";
const PostsList1 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: Date.now(), title: "initial data" }],
  });
  if (postsQuery.isLoading) return <h1>Loading....</h1>;
  if (postsQuery.isError) {
    return <h1>{JSON.stringify(postsQuery.error.message)}</h1>;
  }

  const queries = useQueries({
    queries: (postsQuery.data ?? []).map((post) => {
      return {
        queryKey: ["posts", post.id],
        queryFn: () => getPost(post.id),
      };
    }),
  });

  return (
    <div>
      {postsQuery.isLoading && <h1>Loading....</h1>}
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data?.map((post) => (
          <li key={post.title}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostsList1;
