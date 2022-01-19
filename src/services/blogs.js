import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createBlog = async (blog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};
const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    ...blog,
    likes: blog.likes + 1,
  });

  return response.data;
};
const removeBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};
export default { getAll, createBlog, updateBlog, removeBlog };
