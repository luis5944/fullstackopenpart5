import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const newBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userLs = localStorage.getItem("loginData");
    if (userLs) {
      setUser(JSON.parse(userLs));
    }
  }, []);

  const saveBlog = (blogSaved) => {
    setBlogs((prevBlog) => [...prevBlog, blogSaved]);
    newBlogRef.current.toggleVisibility();
  };

  const updateBlog = (blogUpdate) => {
    const newBlogs = blogs.map((blog) => {
      if (blog.id === blogUpdate.id) {
        blog.likes = blog.likes + 1;
      }
      return blog;
    });

    setBlogs(newBlogs);
  };

  const removeBlog = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };
  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {notification ? (
        <h3 style={{ border: "1px solid black", backgroundColor: "grey" }}>
          {notification}
        </h3>
      ) : (
        ""
      )}
      <p>
        {user.username} logged in{" "}
        <button
          onClick={() => {
            setUser(null);
            localStorage.removeItem("loginData");
          }}
        >
          Logout
        </button>
      </p>

      <Togglable ref={newBlogRef}>
        <NewBlog
          user={user}
          setNotification={setNotification}
          saveBlog={saveBlog}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );

  return <>{user ? blogForm() : <Login setUser={setUser} />}</>;
};

export default App;
