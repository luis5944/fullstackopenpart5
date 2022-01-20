import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const userLs = JSON.parse(localStorage.getItem("loginData"));
  const blogStyle = {
    marginTop: 5,
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const listStyle = {
    listStyle: "none",
  };
  const [toggle, setToggle] = useState(false);
  const [owner, setOwner] = useState(true);

  useEffect(() => {
    if (userLs) {
      if (userLs.username !== blog.user.username) {
        setOwner(false);
      }
    }
  }, [userLs, blog.user.username]);

  const simple = () => (
    <ul style={listStyle}>
      <li>
        Title and Author: {blog.title} {blog.author}
      </li>
    </ul>
  );
  const extended = () => (
    <ul style={listStyle}>
      <li className="titleAuthor">
        Title and Author: {blog.title} {blog.author}
      </li>
      <li className="url"> URL:{blog.url}</li>
      <li className="likes">
        Likes:{blog.likes}{" "}
        <button
          className="updateBlog"
          onClick={async () => {
            updateBlog(blog);
            await blogService.updateBlog(blog);
          }}
        >
          like
        </button>
      </li>
      <li> User:{blog.user.username}</li>
      <li>
        {owner ? (
          <button
            onClick={async () => {
              const confirm = window.confirm(
                `Remove blog ${blog.title} by ${blog.author}`
              );

              if (confirm) {
                await blogService.removeBlog(blog.id, userLs.token);
                removeBlog(blog.id);
              }
            }}
          >
            Remove
          </button>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
  return (
    <div style={blogStyle}>
      <div>
        {!toggle ? simple() : extended()}
        <button
          className="extended"
          onClick={() => {
            setToggle(!toggle);
          }}
          style={{ marginLeft: 5 }}
        >
          {toggle ? "Hide" : "View"}
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
export default Blog;
