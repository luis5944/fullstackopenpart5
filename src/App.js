import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const userLs = localStorage.getItem("loginData");
    if (userLs) {
      setUser(JSON.parse(userLs));
    }
  }, []);
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
      <NewBlog
        user={user}
        setBlogs={setBlogs}
        setNotification={setNotification}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <>{user ? blogForm() : <Login setUser={setUser} />}</>;
};

export default App;
