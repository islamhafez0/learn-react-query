import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostPaginated } from "../api/posts";

function PostListInfinite() {
  const {
    isError,
    isLoading,
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    getNextPageParam: (prevData) => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => getPostPaginated(pageParam),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;
  console.log(data);
  return (
    <>
      <h1>Post List Infinite</h1>
      {data?.pages
        .flatMap((data) => data.posts)
        .map((post) => (
          <div key={post.title}>
            {post.title}
            <b>{post.body}</b>
            <hr />
          </div>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
export default PostListInfinite;
