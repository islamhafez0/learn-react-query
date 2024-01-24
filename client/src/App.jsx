import React, { useState } from "react";
import PostsList1 from "./components/PostsList1";
import PostsList2 from "./components/PostsList2";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import PostListPaginated from "./components/PostListPaginated";
import PostListInfinite from "./components/PostListInfinite";
import { useQueryClient } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
const App = () => {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  const queryClient = useQueryClient();

  // Fetch data on hover and save it in the catch before the user actually get in the page
  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: getPosts,
    });
    console.log(queryClient);
  }

  return (
    <div className="app">
      <div>
        <button onClick={() => setCurrentPage(<PostsList1 />)}>Posts 1</button>
        <button
          onMouseEnter={onHoverPostOneLink}
          onClick={() => setCurrentPage(<PostsList2 />)}
        >
          Posts 2
        </button>
        <button onClick={() => setCurrentPage(<Post id={1} />)}>
          First Post
        </button>
        <button
          onClick={() =>
            setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
          }
        >
          Create Post
        </button>
        <button onClick={() => setCurrentPage(<PostListPaginated />)}>
          Posts List Paginated
        </button>
        <button onClick={() => setCurrentPage(<PostListInfinite />)}>
          Posts List Infinite
        </button>
      </div>
      {currentPage}
    </div>
  );
};

export default App;
