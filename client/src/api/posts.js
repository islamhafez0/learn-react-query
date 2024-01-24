import axios from "axios";

export async function getPosts() {
  return await axios
    .get(`http://localhost:3000/posts/`, { params: { _sort: "title" } })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export function getPost(id) {
  return axios
    .get(`http://localhost:3000/posts?id=${id}`)
    .then((res) => res.data);
}

let latestPostId = 9;

export function createPost({ title, body }) {
  latestPostId += 1;
  return axios
    .post("http://localhost:3000/posts", {
      title,
      body,
      id: latestPostId.toString(),
      userId: Date.now(),
    })
    .then((res) => res.data);
}

export function getPostPaginated(page) {
  const limit = 2;
  return axios
    .get("http://localhost:3000/posts", {
      params: {
        _page: page,
        _sort: "title",
        _limit: limit,
      },
    })
    .then((res) => {
      const hasNext = res.data.length === limit;
      return {
        nextPage: hasNext ? page + 1 : undefined,
        prevPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      };
    });
}
