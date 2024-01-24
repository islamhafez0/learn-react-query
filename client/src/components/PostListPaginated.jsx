import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPostPaginated } from "../api/posts";

const PostListPaginated = () => {
  const [page, setPage] = useState(1);
  const paginatedQuery = useQuery({
    queryKey: ["posts", { page }],
    queryFn: () => getPostPaginated(page),
    staleTime: 0,
  });

  if (paginatedQuery.isLoading) return <h1>Loading...</h1>;
  if (paginatedQuery.isError)
    return <h1>{JSON.stringify(paginatedQuery.error)}</h1>;
  console.log(paginatedQuery);
  const { data } = paginatedQuery;
  return (
    <div>
      <h1>
        Post List Paginated <br />
        {data?.prevPage && <small>Previous data</small>}
      </h1>

      {data?.posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}

      {data?.prevPage && (
        <button onClick={() => setPage(data.prevPage)}>Previous</button>
      )}
      {data?.nextPage && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </div>
  );
};

export default PostListPaginated;
