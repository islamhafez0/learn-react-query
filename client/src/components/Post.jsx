import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";

const Post = ({ id }) => {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["user", postQuery?.data?.[0].id],
    enabled: !!postQuery?.data?.[0].id,
    queryFn: () => getUser(postQuery?.data?.[0].id),
  });

  if (postQuery.status === "loading") return <h1>Loading...</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }
  return (
    <div>
      <h1>
        {postQuery.data?.[0].title}
        <br />
        <small style={{ color: "red" }}>
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? `Error Loading User`
            : `username: ${userQuery.data?.name}`}
        </small>
      </h1>
      <p>{postQuery.data?.[0].body || "No body provided"}</p>
    </div>
  );
};

export default Post;
