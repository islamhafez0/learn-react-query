import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { createPost } from "../api/posts";
import Post from "./Post";

const CreatePost = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient();
  const createNewPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!titleRef.current.value && !bodyRef.current.value) {
      alert("error");
      return;
    }
    createNewPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
    titleRef.current.value = "";
    bodyRef.current.value = "";
  }
  return (
    <div>
      <h1>Create New Post</h1>

      <form onSubmit={handleSubmit}>
        <label style={{ marginRight: "10px" }} htmlFor="title">
          Title
        </label>
        <input type="text" id="title" ref={titleRef} /> <br />
        <label style={{ marginRight: "10px" }} htmlFor="body">
          Body
        </label>
        <input type="text" id="body" ref={bodyRef} /> <br />
        <button
          disabled={
            createNewPostMutation.isLoading ||
            createNewPostMutation.status === "loading"
          }
        >
          {createNewPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
