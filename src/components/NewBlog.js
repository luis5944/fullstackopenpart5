import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ user, saveBlog, setNotification }) => {
  const initialState = { title: "", author: "", url: "" };
  const [newBlog, setNewBlog] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogSaved = await blogService.createBlog(newBlog, user.token);
      saveBlog(blogSaved);
      notification(blogSaved);
      setNewBlog(initialState);
    } catch (error) {
      console.log(error.message);
      notification();
    }
  };

  const notification = (blogSaved) => {
    if (blogSaved) {
      setNotification(
        `A new blog: ${blogSaved.title} by ${blogSaved.author} was added `
      );
    } else {
      setNotification("All fields are required and minimum 3 caracters");
    }
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleSubmit} id="form">
        <div>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            value={newBlog.title}
            id="title"
            onChange={(e) => {
              setNewBlog({ ...newBlog, title: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            name="author"
            value={newBlog.author}
            id="author"
            onChange={(e) => {
              setNewBlog({ ...newBlog, author: e.target.value });
            }}
          />
        </div>

        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            name="url"
            value={newBlog.url}
            id="url"
            onChange={(e) => {
              setNewBlog({ ...newBlog, url: e.target.value });
            }}
          />
        </div>
        <button type="submit" id="create-button">
          Create
        </button>
      </form>
    </>
  );
};

export default NewBlog;
